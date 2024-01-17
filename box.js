
// Lấy tham chiếu đến modal và nút mở modal
    var modal = document.getElementById("myModal");
    var openModalBtn = document.getElementById("openModalBtn");

    // Lấy tham chiếu đến nút đóng modal và nút "CONTINUE"
    var closeModalBtn = document.getElementById("closeModal");
    var continueBtn = document.getElementById("continueModal");

    // Bắt sự kiện click vào nút đóng modal
    modal.addEventListener("click", function() {
      modal.classList.remove("show");
      modal.style.display = "none";
    });

    // Bắt sự kiện click vào nút "CONTINUE"
    continueBtn.addEventListener("click", function() {
      modal.classList.remove("show");
      modal.style.display = "none";
      // Thực hiện các hành động tiếp theo ở đây nếu cần
    });
    var isRequestSent = false;

  $('#insertGift').click(function() {
    if(localGift && localGift.title && danhan>0){
      if (!isRequestSent && localGift.title) {
    $.ajax({
        url: 'gift/send', // Thay thế URL_SERVER bằng URL thực tế tới server của bạn
        type: 'POST', // Hoặc 'GET', tùy thuộc vào loại yêu cầu bạn muốn thực hiện
        data: {
          title: localGift.title,
          bank: localGift.bank
        },
        success: function(response) {
          var pre = document.querySelector('.present').classList.toggle('open');
    if(document.querySelector('.present').classList.toggle('open')){
          var nhanqua = document.getElementById("nhanqua");
          nhanqua.textContent = 'Chúc mừng bạn nhận được ddC '+localGift.title+' '+localGift.bank+'. Hệ thống ngân hàng sẽ liên lạc cho quý khách để nhận quà'
          var modal = document.getElementById("myModal");
          modal.classList.add("show");
          modal.style.display = "block";
         }
        },
        error: function(xhr, status, error) {
            // Xử lý lỗi ở đây
            console.error("Có lỗi xảy ra: " + error);
        }
    });
   
  } else {
  //   var insertGift = document.getElementById('insertGift');
  // if (!insertGift.classList.contains('open')) {
  //   console.log(112)
  //   if(danhan>0) {
  //     var nhanqua = document.getElementById("nhanqua");
  //           nhanqua.textContent = 'Chúc mừng bạn nhận được ddC '+localGift.title+' của ngân hàng '+localGift.bank+'. Hệ thống ngân hàng sẽ liên lạc cho quý khách để nhận quà'
  //           var modal = document.getElementById("myModal");
  //           modal.classList.add("show");
  //           modal.style.display = "block";
  //   }
  // }
  }
    } else {
      alert('Nhập tài khoản ngân hàng để nhận phần quà!');
    }
    if(danhan == 0) {
      isRequestSent = true;
    }
   
});

    const present = document.querySelector('.present');
present.onclick = () => {
  if(danhan == 0){ 
      exit();
      return 
    }
  if(localGift && localGift.title) {
    present.classList.toggle('open');
    if (present.classList.contains('open')) {
        const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 100; i++) {
        let particle = document.createElement('div');
        particle.classList.add('fireworkParticle');
        document.getElementById('fireworksContainer').appendChild(particle);

        let angle = Math.random() * Math.PI * 2;
        let radius = Math.random() * 200 + 100;
        let dx = Math.cos(angle) * radius + 'px';
        let dy = Math.sin(angle) * radius + 'px';

        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--dx', dx);
        particle.style.setProperty('--dy', dy);

        // Xóa hạt sau khi animation kết thúc
        particle.addEventListener('animationend', function() {
            particle.remove();
        });
    }
    } else {
      if(danhan > 0){
        fetchDataAndDisplay()
        danhan = danhan - 1;
      } 
    }
  }
}

(function () {
  'use strict';

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  let width, height, lastNow;
  let snowflakes;
  let maxSnowflakes = 500; // Số lượng tuyết rơi lớn hơn

  function init() {
    snowflakes = [];
    resize();
    render(lastNow = performance.now());
  }

  function render(now) {
    requestAnimationFrame(render);

    const elapsed = now - lastNow;
    lastNow = now;

    ctx.clearRect(0, 0, width, height);
    if (snowflakes.length < maxSnowflakes)
      snowflakes.push(new Snowflake());

    //ctx.fillStyle = ctx.strokeStyle = 'rgba(255, 255, 255, .8)'; // Độ trong suốt tăng lên và màu sắc trắng

    snowflakes.forEach(snowflake => snowflake.update(elapsed, now));
  }

  function pause() {
    cancelAnimationFrame(render);
  }

  function resume() {
    lastNow = performance.now();
    requestAnimationFrame(render);
  }
  function createSparklingGradient(x, y, size) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  return gradient;
}
  class Snowflake {
    constructor() {
      this.spawn();
    }

    spawn(anyY = false) {
      this.x = rand(0, width);
      this.y = anyY === true ?
      rand(-50, height + 50) :
      rand(-50, -10);
      this.xVel = rand(-.05, .05);
      this.yVel = rand(.02, .1);
      this.angle = rand(0, Math.PI * 2);
      this.angleVel = rand(-.001, .001);
      this.size = rand(7, 12);
      this.sizeOsc = rand(.01, .5);
    }

    update(elapsed, now) {
      const xForce = rand(-.001, .001);

      if (Math.abs(this.xVel + xForce) < .075) {
        this.xVel += xForce;
      }

      this.x += this.xVel * elapsed;
      this.y += this.yVel * elapsed;
      this.angle += this.xVel * 0.05 * elapsed; //this.angleVel * elapsed

      if (
      this.y - this.size > height ||
      this.x + this.size < 0 ||
      this.x - this.size > width)
      {
        this.spawn();
      }

      this.render();
    }

    render() {
    ctx.save();
    const { x, y, size } = this;
    const gradient = createSparklingGradient(x, y, size); // Sử dụng gradient
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }
  }

  // Utils
  const rand = (min, max) => min + Math.random() * (max - min);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    maxSnowflakes = Math.max(width / 10, 100);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('blur', pause);
  window.addEventListener('focus', resume);
  init();

})();



function convertTextToImage() {
    var canvas = document.getElementById('textCanvas');
    var text = 'Đã nhận quà';
    //console.log(text);
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "black"; // Màu sắc của text
     var fontSize = calculateFontSize();
    ctx.font = 200 + "px Arial"; // Font và kích thước của text

    // Chuyển canvas thành hình ảnh
    var img = document.getElementById('namlehoai');
    img.src = canvas.toDataURL();
}

// Gọi hàm khi trang web tải xong
window.onload = convertTextToImage;
document.getElementById('startFireworksButton').addEventListener('click', function() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 100; i++) {
        let particle = document.createElement('div');
        particle.classList.add('fireworkParticle');
        document.getElementById('fireworksContainer').appendChild(particle);

        let angle = Math.random() * Math.PI * 2;
        let radius = Math.random() * 200 + 100;
        let dx = Math.cos(angle) * radius + 'px';
        let dy = Math.sin(angle) * radius + 'px';

        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--dx', dx);
        particle.style.setProperty('--dy', dy);

        // Xóa hạt sau khi animation kết thúc
        particle.addEventListener('animationend', function() {
            particle.remove();
        });
    }
});
function calculateFontSize() {
    // Tính toán kích thước phù hợp dựa trên kích thước màn hình
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    
    // Định nghĩa kích thước tối thiểu và tối đa cho font
    var minFontSize = 140;
    var maxFontSize = 230;
    
    // Tùy chỉnh các giới hạn kích thước dựa trên màn hình
    var fontSize = Math.min(maxFontSize, screenWidth / 10); // Ví dụ: tối đa là 1/10 của chiều rộng màn hình
    fontSize = Math.max(minFontSize, fontSize); // Đảm bảo font không nhỏ hơn kích thước tối thiểu
    
    return fontSize;
}

  
