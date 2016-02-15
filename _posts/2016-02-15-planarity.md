---
layout: post
title:  "Planarity Explained"
description: An interesting way to visualize and better understand planarity from graph theory
tags:
- Graph Theory
- Mathematics
date: 2016-02-15
---

I have spent a lot of time with graph theory, specifically thinking about planarity, and during that time I came up with an interesting way to visualize planarity. Once I started visualizing graphs with this method it was very difficult to see them any other way. I would like to attempt to share with you this idea today.

Given an arbitrary graph it is difficult to know whether or not it is planar just by looking at it, but we have a formula to describe precisely what it means to be planar. That formula goes by the name of **Euler's Formula**

```
Vertices - Edges + Faces = 2
```

Although incredibly easy to determine whether a graph is planar or not, it gives no hint as to how to position the graph on a plane. There are, after all, non-planar embeddings of planar graphs.

This is where I am supposed to come in and offer a brilliant solution to all your problems, but I don't have that. Planar embedding is not trivial, but I can show it is easy for a certain subset of graphs. That subset of graphs is the 3D forms projected on the plane.

I'll start with the cube and build up from there.

![A planar embedding of a cube](/images/posts/planar-cube.png)

This is an embedding of the cube in the plane. Simple enough. I imagine most people would be able to come up with this, or even several other embeddings that work. What I'd like to highlight here, however, is the process rather than the embedding itself.

You can picture that the cube was placed on the plane and then we flattened the cube by pushing down on the top face until it reached the same plane as the bottom face. Of course, we must imagine that the cube is made of a somewhat elastic material and is able to stretch its edges rather than collapse. As we pushed the top face down, the outside edges stretched out allowing the top face to settle inside the rest of the cube.

We missed part of the cube during the above process, and that part is the bottom face. We have to imagine that the rest of the plane, the unbounded part, is this bottom face. One way to picture this is that as soon as the cube is placed on the plane, the face that made contact stretched infinitely to cover the plane. If the cube were multicoloured, each face with a unique colour, that would look like this:

![A planar embedding of multicoloured cube](/images/posts/planar-cube-coloured.png)

With this process you can easily start picturing more and more complex shapes, such as the icosahedron (20 sides).

![A planar icosahedron](/images/posts/planar-icosahedron.png)

These are the simple shapes, but you can keep going and go as far as embedding any n-gon.

Knowing a little trick from computer graphics, we know that all forms can be triangulated. That means that any 3-dimensional form (so long as it is loop-free) can be embedded in the plane, and now you can even come up with a way to do it.

I hope you find this as exciting as I do.
