import '@/assets/bootstrap.min.css';
import '@/less/index.less';
import '@/common/common.less';
import './index.less';
import Swiper from 'swiper';
$(function () {
  // let screenWidth = $(document).width()
  // let spacing = 0 // 距离屏幕一侧距离
  // const $advantagesContainer = $('.advantages')
  // const $advantage = $advantagesContainer.find('.item')
  // let advantagesContainerWidth = $advantagesContainer.width()
  // let advantageWidth = $advantage.width()
  // let margin = (advantagesContainerWidth - advantageWidth * $advantage.length) / ($advantage.length - 1)
  // slideInit()
  // $(window).resize(function () {
  //   screenWidth = $(document).width()
  //   slideInit()
  // })
  //
  // let currentAdvantage = 0
  // let touchStart = 0
  //
  // function slideInit() {
  //   if(screenWidth <= 750) {
  //     spacing = parseInt((screenWidth - $advantage.width()) / 2)
  //     $advantagesContainer.css("transform", `translateX(${spacing}px)`)
  //     advantagesContainerWidth = $advantagesContainer.width()
  //     advantageWidth = $advantage.width()
  //     margin = (advantagesContainerWidth - advantageWidth * $advantage.length) / ($advantage.length - 1)
  //   }else {
  //     $advantagesContainer.css("transform", `translateX(0px)`)
  //   }
  // }
  //
  // function slide() {
  //
  //   console.log(advantagesContainerWidth, advantageWidth, margin)
  //
  //   $advantagesContainer.on('touchstart', function (e) {
  //     touchStart = e.touches[0].clientX
  //   })
  //   $advantagesContainer.on('touchmove', function (e) {
  //     const currentTouch = e.touches[0].clientX
  //     const translateX = $advantagesContainer.css("transform").replace(/[^0-9\-,]/g,'').split(',')[4]
  //     let translateDistance = parseInt(translateX) + currentTouch - touchStart
  //     const maxTranslate = parseInt(spacing - ($advantage.length - 1) * (advantageWidth + margin))
  //     if(translateDistance >= spacing) {
  //       translateDistance = spacing
  //     }else if(translateDistance <= maxTranslate) {
  //       translateDistance = maxTranslate
  //     }
  //     $advantagesContainer.css("transform", `translateX(${translateDistance}px)`)
  //     touchStart = currentTouch
  //   })
  //   $advantagesContainer.on('touchend', function (e) {
  //     touchStart = 0
  //   })
  // }
  // slide()

  // 使用swiper插件


  let screenWidth = $(document).width()
  let mySwiper = null
  const $track = $('.track')
  const $submitTrack = $('.submitTrack')
  // 查询追踪信息
  $submitTrack.on('click', function () {
    const value = $track.val().trim()
    if(value) {
      window.open('http://ftc1688.com/Tracking/index.aspx?num=' + value)
    }
  })

  if (screenWidth <= 750) {
    swiperInit()
  }

  function swiperInit() {
    console.log('init')
    mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      centeredSlides: true,
    });
  }

  function swiperDestroy() {
    console.log('destroy')
    mySwiper.destroy(true, true)
    mySwiper = null
  }
  $(window).resize(function () {
    screenWidth = $(document).width()
    if (screenWidth <= 750) {
      if(!mySwiper) {
        swiperInit()
      }
    }else {
      if(mySwiper) {
        swiperDestroy()
      }
    }

  })

})
