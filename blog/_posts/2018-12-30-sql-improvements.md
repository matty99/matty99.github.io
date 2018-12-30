---
layout: post
title: "SQL Improvements"
description: Suggestions for query optimizations and a language feature
tags:
- Databases
- SQL
date: 2018-12-30
---

SQL has been around for ages now, but only recently have I started to use it more without an ORM as a mediator. After a few months of heightened usage I noticed a few shortcomings that I wish to share with you, as well as possible solutions to them.

On my team we do a lot of analysis and reporting on all sorts of products. Each of these products has their own databases and table structures managed by the individual teams. When just starting out on a complex query I usually just want a small sample of the data to make sure I'm on the right track so that I can build up my intuition on the data. I might start with a query like the following...

{% highlight sql %}

SELECT b.id, e.id, c.id  FROM business b
JOIN employees e ON e.buisness_id = b.id
JOIN customers c ON c.employee_contact_id = e.id
LIMIT 100

{% endhighlight %}

In just this small query there are already quite a few performance issues.

1. The `LIMIT` is applied at the end of the query, which means if either the business, employees, or customers tables contain a large number of records, the query will run for quite some time before being truncated at the 100 row mark in the last step. Ideally the joins are just calculated on 100 records, that is the `LIMIT` is applied early on in the query calculation. This is of course achievable through alternate syntax, but it would be nice if it worked in this simple syntax as well. Ideally it behaves more like the following:
```
...
JOIN (
    SELECT id
    FROM employees e
    WHERE e.buisness_id IN (
        SELECT id
        FROM business
        LIMIT 100
    )
)
...
```

2. Entire rows are fetched from the joined tables (i.e. employees, customers) rather than just the columns of interest. This does not matter much in a row-optimized implementation such as MySQL, but it would have a huge impact on a column-optimized implementation such as Redshift. Ideally there is an implicit column filter in the `JOIN` which would behave similar to the following:
```
...
JOIN (
    SELECT id
    FROM employees e
)
...
```

3. The final suggestion is more about a feature I wish existed when it came to working with `LIMIT` and `JOIN`. Assume that there are on average about 3 employees in a business and about 2 customers per employee, then it would be great if you could apply a limit to the queries within a `JOIN`. An example would be the following syntax:
```
SELECT b.id, e.id, c.id  FROM business b LIMIT 100
JOIN employees e ON e.buisness_id = b.id LIMIT 300
JOIN customers c ON c.employee_contact_id = e.id LIMIT 600
```

Having any one of these 3 suggestions implemented in the language would be a great quality of life improvement for my team. I wonder if other heavy SQL users out there would benefit the same way. Looking forward to the discussions this brings up.
