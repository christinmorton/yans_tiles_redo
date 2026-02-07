var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? !0
      : !1;
  var Scrollbar = window.Scrollbar;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.header();
      Init.wow();
      Init.aboutBar();
      Init.dropdown();
      Init.slick();
      Init.categoryToggle();
      Init.formValidation();
      Init.datepicker();
      Init.contactForm();
    },
    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },
    BackToTop: function () {
      var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
      var rootElement = document.documentElement;
      function handleScroll() {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.05) {
          scrollToTopBtn.classList.add("showBtn");
        } else {
          scrollToTopBtn.classList.remove("showBtn");
        }
      }
      function scrollToTop() {
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
      document.addEventListener("scroll", handleScroll);
    },
    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 1800);
    },
    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }
      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }
      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }
      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }
      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },
    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow",
          animateClass: "animated",
          mobile: true,
          live: true,
        });
        wow.init();
      }
    },
    aboutBar: function () {
      var lang = {
        cleaning: "85%",
        build: "50%",
        repairing: "75%",
      };
      var multiply = 3;
      $.each(lang, function (language, pourcent) {
        var delay = 200;
        setTimeout(function () {
          $("#" + language + "-pourcent").html(pourcent);
        }, delay * multiply);
        multiply++;
      });
    },
    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        const optionsList = selected.querySelectorAll(
          "div.wrapper-dropdown li"
        );

        selected.addEventListener("click", () => {
          let arrow = selected.children[1];

          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        // update the display of the dropdown
        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });

      // check if anything else ofther than the dropdown is clicked
      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });

      // close all the dropdowns
      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          const optionsContainer = selected.children[2];
          let arrow = selected.children[1];

          handleDropdown(selected, arrow, false);
        });
      }

      // open all the dropdowns
      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },
    slick: function () {
      if ($(".testimonial-slider").length) {
        $(".testimonial-slider").slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          dots: false,
          draggable: true,
          arrows: false,
          speed: 800,
          autoplaySpeed: 4000,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      if ($(".testimonials-slider").length) {
        $(".testimonials-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: !0,
          variableWidth: true,
          centerMode: true,
          autoplay: true,
          dots: false,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          speed: 800,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 1,
                variableWidth: false,
                centerMode: false,
              },
            },
          ],
        });
      }
      if ($(".article-slider").length) {
        $(".article-slider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: !0,
          variableWidth: true,
          centerMode: true,
          autoplay: true,
          dots: false,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          speed: 800,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 1,
                variableWidth: true,
                centerMode: true,
              },
            },
          ],
        });
      }
      if ($(".contact-slider").length) {
        $(".contact-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: !0,
          autoplay: true,
          dots: true,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          speed: 800,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });
      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },
    categoryToggle: function () {
      if ($(".cus-support-container").length) {
        $(".myTextBox").on("click", function () {
          var textBoxValue = $(this).text().trim();
          $(".myTextBoxResult").val(textBoxValue);
        });
      }
    },
    formValidation: function () {
      if ($("#contactForm").length) {
        $("#contactForm").validate();
      }
      if ($("#estimateForm").length) {
        $("#estimateForm").validate();
      }
    },
    datepicker: function () {
      if ($(".datepicker").length && typeof $.fn.pickadate !== "undefined") {
        $(".datepicker").pickadate({
          min: true,
          format: "mmmm d, yyyy",
          formatSubmit: "yyyy-mm-dd",
          selectMonths: true,
          selectYears: 2,
        });
      }
    },
    contactForm: function () {
      if (typeof emailjs !== "undefined") {
        emailjs.init("V5tTSEcWoY1WyAs3F");
      }

      var serviceID = "service_03r0hxr";
      var templateID = "template_iysvt2a";
      var formLoadTime = Date.now();

      function showFormStatus(form, message, isError) {
        var existing = form.querySelector(".form-status");
        if (existing) existing.remove();

        var statusDiv = document.createElement("div");
        statusDiv.className = "form-status";
        statusDiv.style.cssText =
          "padding: 12px 16px; border-radius: 6px; margin-top: 16px; font-weight: 500;";

        if (isError) {
          statusDiv.style.background = "#FEE2E2";
          statusDiv.style.color = "#DC2626";
        } else {
          statusDiv.style.background = "#DCFCE7";
          statusDiv.style.color = "#16A34A";
        }

        statusDiv.textContent = message;
        form.appendChild(statusDiv);
      }

      function handleSubmit(formEl) {
        if (!$(formEl).valid()) return;

        var honeypot = formEl.querySelector('[name="website"]');
        if (honeypot && honeypot.value) return;
        if (Date.now() - formLoadTime < 3000) return;

        var submitBtn = formEl.querySelector('button[type="submit"]');
        var originalText = submitBtn.querySelector(".text").textContent;
        submitBtn.disabled = true;
        submitBtn.querySelector(".text").textContent = "Sending...";

        var formData = {
          name: formEl.querySelector('[name="name"]').value,
          email: formEl.querySelector('[name="email"]').value,
          phone: formEl.querySelector('[name="phone"]').value,
          service: formEl.querySelector('[name="service"]')
            ? formEl.querySelector('[name="service"]').value
            : "",
          message: formEl.querySelector('[name="message"]')
            ? formEl.querySelector('[name="message"]').value
            : "",
          date: formEl.querySelector('[name="date"]')
            ? formEl.querySelector('[name="date"]').value
            : "",
          address: formEl.querySelector('[name="address"]')
            ? formEl.querySelector('[name="address"]').value
            : "",
        };

        emailjs.send(serviceID, templateID, formData).then(
          function () {
            showFormStatus(
              formEl,
              "Thank you! Your message has been sent. We'll get back to you soon.",
              false
            );
            formEl.reset();
            submitBtn.disabled = false;
            submitBtn.querySelector(".text").textContent = originalText;
          },
          function () {
            showFormStatus(
              formEl,
              "Something went wrong. Please call us at (917) 531-9152 instead.",
              true
            );
            submitBtn.disabled = false;
            submitBtn.querySelector(".text").textContent = originalText;
          }
        );
      }

      if ($("#contactForm").length) {
        document
          .getElementById("contactForm")
          .addEventListener("submit", function (e) {
            e.preventDefault();
            handleSubmit(this);
          });
      }

      if ($("#estimateForm").length) {
        document
          .getElementById("estimateForm")
          .addEventListener("submit", function (e) {
            e.preventDefault();
            handleSubmit(this);
          });
      }
    },
  };
  Init.i();
})(window, document, jQuery);
