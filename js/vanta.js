window.addEventListener('DOMContentLoaded', function() {
    if (window.VANTA) {
        VANTA.TOPOLOGY({
            el: "body", // o document.body
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xEADA52,        
            backgroundColor: 0xF6F95B
        });
    }
});