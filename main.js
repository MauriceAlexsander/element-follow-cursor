jQuery(document).ready(function() {
    let mouse_x = 0, mouse_y = 0;
    let ball_position_x = 0, ball_position_y = 0;
    
    let ball = document.getElementById("circle");
    let new_height = 80
    let new_width = 80
    let new_margin = 0

    $(document).mousemove(function(e){
        mouse_x = e.pageX - 40;
        mouse_y = e.pageY - 40; 
    });

    setInterval(function(){
        // change ball position
        ball_position_x += ((mouse_x - ball_position_x)/6);
        ball_position_y += ((mouse_y - ball_position_y)/6);
        $("#circle").css({left: ball_position_x +'px', top: ball_position_y +'px'});

        // change ball rotation
        delta_x = mouse_x - ball.getBoundingClientRect().left
        delta_y = mouse_y - ball.getBoundingClientRect().top
        let angle = Math.atan2(delta_y, delta_x) * (180/Math.PI)
        ball.style.transform = `rotate(${angle < 0 ? angle + 90 + 360 : angle + 90}deg)`;

        // change ball height and width
        // make the animation more natural
        let ball_height = ball.offsetHeight;
        let ball_width = ball.offsetWidth;
        let ball_margin_left = window.getComputedStyle(ball).getPropertyValue("margin-left").match(/\d+/)
        
        if (mouse_y > ball_position_y + 40 || mouse_y < ball_position_y - 40 || mouse_x > ball_position_x + 40 || mouse_x < ball_position_x - 40) {
                new_height += ((90 - ball_height)/8)
                ball.style.height = new_height + 'px'; 
                
                new_width += ((70 - ball_width)/8)
                ball.style.width = new_width + 'px';
                
                new_margin += ((5 - ball_margin_left)/16)
                ball.style.marginLeft = new_margin + 'px'; 
        }
        else {
            new_height += ((80 - ball_height)/8)
            ball.style.height = new_height + 'px';

            new_width += ((80 - ball_width)/8)
            ball.style.width = new_width + 'px';

            new_margin += ((0 - ball_margin_left)/8)
            ball.style.marginLeft = new_margin + 'px';
        }
    }, 20);
});
