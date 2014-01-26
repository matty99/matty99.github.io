!function ($) {
	$(function(){
		// IE10 viewport hack for Surface/desktop Windows 8 bug
		if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
			var msViewportStyle = document.createElement("style");
			msViewportStyle.appendChild(
				document.createTextNode(
					"@-ms-viewport{width:auto!important}"
					)
				);
			document.getElementsByTagName("head")[0].
			appendChild(msViewportStyle);
		}

		// Bootstrap affix sidebar
		var $sideBar = $('#sidebar')
		$sideBar.affix({
			offset: {
				top: -1 // Always has affix property
			}
		})
	})
}(jQuery)

// Enabling light boxes
var myCustomLightbox = new RGlightbox({/*options*/});
