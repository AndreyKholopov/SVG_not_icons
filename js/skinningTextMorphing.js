var doc = document,
	body = doc.body,
	a = TweenMax;

var shape = doc.getElementById('skinningTextMorphing'),
	svg = shape.parentNode,
	wrap = doc.getElementsByClassName('wrapSkinningTextMorphing')[0];

var paths = [
	'M37.0469 58.3672C25.4688 55.0391 17.0312 50.9609 11.7344 46.1328C6.48438 41.2578 3.85938 35.2578 3.85938 28.1328C3.85938 20.0703 7.07031 13.4141 13.4922 8.16406C19.9609 2.86719 28.3516 0.21875 38.6641 0.21875C45.6953 0.21875 51.9531 1.57812 57.4375 4.29688C62.9688 7.01563 67.2344 10.7656 70.2344 15.5469C73.2812 20.3281 74.8047 25.5547 74.8047 31.2266H61.2344C61.2344 25.0391 59.2656 20.1875 55.3281 16.6719C51.3906 13.1094 45.8359 11.3281 38.6641 11.3281C32.0078 11.3281 26.8047 12.8047 23.0547 15.7578C19.3516 18.6641 17.5 22.7188 17.5 27.9219C17.5 32.0938 19.2578 35.6328 22.7734 38.5391C26.3359 41.3984 32.3594 44.0234 40.8438 46.4141C49.375 48.8047 56.0312 51.4531 60.8125 54.3594C65.6406 57.2188 69.2031 60.5703 71.5 64.4141C73.8438 68.2578 75.0156 72.7812 75.0156 77.9844C75.0156 86.2812 71.7812 92.9375 65.3125 97.9531C58.8438 102.922 50.1953 105.406 39.3672 105.406C32.3359 105.406 25.7734 104.07 19.6797 101.398C13.5859 98.6797 8.875 94.9766 5.54688 90.2891C2.26562 85.6016 0.625 80.2812 0.625 74.3281H14.1953C14.1953 80.5156 16.4688 85.4141 21.0156 89.0234C25.6094 92.5859 31.7266 94.3672 39.3672 94.3672C46.4922 94.3672 51.9531 92.9141 55.75 90.0078C59.5469 87.1016 61.4453 83.1406 61.4453 78.125C61.4453 73.1094 59.6875 69.2422 56.1719 66.5234C52.6562 63.7578 46.2812 61.0391 37.0469 58.3672Z',
	'M44.7734 85.0703L74.0234 0.625H88.7891L50.8203 103H38.8672L0.96875 0.625H15.6641L44.7734 85.0703Z',
	'M79.4688 90.5703C76 95.5391 71.1484 99.2656 64.9141 101.75C58.7266 104.188 51.5078 105.406 43.2578 105.406C34.9141 105.406 27.5078 103.461 21.0391 99.5703C14.5703 95.6328 9.55469 90.0547 5.99219 82.8359C2.47656 75.6172 0.671875 67.25 0.578125 57.7344V48.8047C0.578125 33.3828 4.16406 21.4297 11.3359 12.9453C18.5547 4.46094 28.6797 0.21875 41.7109 0.21875C52.3984 0.21875 61 2.96094 67.5156 8.44531C74.0312 13.8828 78.0156 21.6172 79.4688 31.6484H65.9688C63.4375 18.1016 55.375 11.3281 41.7812 11.3281C32.7344 11.3281 25.8672 14.5156 21.1797 20.8906C16.5391 27.2188 14.1953 36.4062 14.1484 48.4531V56.8203C14.1484 68.3047 16.7734 77.4453 22.0234 84.2422C27.2734 90.9922 34.375 94.3672 43.3281 94.3672C48.3906 94.3672 52.8203 93.8047 56.6172 92.6797C60.4141 91.5547 63.5547 89.6562 66.0391 86.9844V63.9922H42.3438V53.0234H79.4688V90.5703Z'
]

var colors = [
	0x3D8CD0,
	0xD32A7B,
	0x2AD37A
]

var ease = Power4.easeInOut,
	speed = 1.6,
	ww = window.innerWidth,
	distance = ww / 3.3 - svg.getBoundingClientRect().width,
	current = 1;

function startSkinningTextMorphing(){
	a.to(shape, speed, {
		morphSVG: {shape:paths[current], shapeIndex: 2},
		stroke: colors[current],
		ease: ease
	});
	a.to(svg, speed, {
		x: '+='+distance,
		ease: ease,
		onUpdate: function(){
			createElementSkinningTextMorphing();
		},
		onComplete: function(){
			removeElementsSkinningTextMorphing();
			current = current == 2 ? 0 : current+1;
		}
	})
	moveSkinningTextMorphing();
}

function moveSkinningTextMorphing(){
	a.to(wrap, speed, {
		x: '-='+distance,
		ease: ease,
		onComplete: startSkinningTextMorphing
	})
}

function stopSkinningTextMorphing() {
	a.killAll();
}

function createElementSkinningTextMorphing(path) {
  var tmp = svg.cloneNode(true);
  tmp.getElementsByTagName('path')[0].removeAttribute('id');
  wrap.insertBefore(tmp, wrap.firstChild);
}

function removeElementsSkinningTextMorphing(){
	[].slice.call(wrap.children).reverse().forEach(function(element, i){
		if (i !== wrap.children.length-1) {
			setTimeout(function(){
				wrap.removeChild(element);
			}, 8 * i)
		}
		
	});
   
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        stopSkinningTextMorphing()
    }
});