import "../scss/sphinx_materialdesign_theme.scss";
import "material-design-lite";
import "babel-polyfill";
import ScrollSpy from "./scrollspy";
import AdjustHeight from "./adjust-height";

$(function() {
    $('body').fadeIn(0);
    $('.page-content > blockquote:first-child').remove();
    $('table').removeAttr('border');

    const styleColorTextPrimary = () => {
        $('h1, h2, h3, h4, h5, h6, .toc-backref, .contents, .toctree-wrapper, .contents a, .toctree-wrapper a, .globaltoc a.current').addClass('mdl-color-text--primary');
    }

    function reconstructionDrawerGlobalToc() {
        const $globaltoc = $('.mdl-layout__drawer nav');
        const $lists = $globaltoc.find('li');
        $.each($lists, function(index, li) {
            const $li = $(li);
            const $linkWrapper = $('<span class="link-wrapper"></span>');
            const $link = $li.children('a');
            $li.append($linkWrapper.append($link));

            const isCurrent = $li.hasClass('current') && !$link.hasClass('current');
            const $ul = $li.children('ul');
            if ($ul.length) {
                const ulId = `globalnav-${index}`;
                $ul.attr('id', ulId);
                $ul.addClass('collapse');
                const $toggleWrapper = $('<span class="nav-toggle"></span>');
                if (isCurrent) {
                    $ul.addClass('show');
                    $toggleWrapper.addClass('show');
                } else {
                    $ul.hide();
                }

                $li.append(
                    $linkWrapper.append(
                        $toggleWrapper.append(
                            $(`<a class="mdl-button mdl-js-button mdl-button--icon" data-toggle="#${ulId}"><i class="material-icons">keyboard_arrow_down</i></span>`)
                        )
                    )
                ).append($ul);
            }
        });
    }

    function collapse() {
        $('.mdl-layout__drawer nav .nav-toggle a').click(function() {
            const $toggle = $(this);
            const id = $toggle.attr('data-toggle');
            $(`ul${id}`).toggleClass('show').animate({height: "toggle", opacity: "toggle"});
            $toggle.parent().toggleClass('show');
        });
    }
    
    function styleMdlCodeBlock() {
        // Set up hover functionality dynamically based on number of lines
        $("pre").hover(function() {
            var $this = $(this);
            // Determine if the text has multiple lines
            var hoverText = $this.text().trim().split("\n").length > 2 ? "double-click to copy" : "click to copy";
            $this.attr("click-to-copy", hoverText);
        });
        
        // Set up click or double-click functionality based on the number of lines
        $("pre").each(function() {
            var $this = $(this);
            // Check if the text contains multiple lines
            if ($this.text().trim().split("\n").length > 2) {
                // Use double-click for multiple lines
                $this.dblclick(function() {
                    copyToClipboard($this);
                });
            } else {
                // Use single click for single line
                $this.click(function() {
                    copyToClipboard($this);
                });
            }
        });
    }
    
    // Function to copy text to clipboard
    function copyToClipboard(elem) {
        var text = elem.text();
        var textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        var successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful) {
            elem.attr("click-to-copy", "copied!");
        } else {
            elem.attr("click-to-copy", "copy failed, try again");
        }
    }
    
    function quickSearchClickEvent() {
        const $breadcrumb = $('.breadcrumb');
    
        $('#waterfall-exp').focus(() => {
            if ($(window).width() <= 1024) {
                $breadcrumb.hide(); 
            }
        }).blur(() => {
            if ($(window).width() <= 1024) {
                $breadcrumb.show(); 
            }
        });
    }

    styleMdlCodeBlock();
    styleColorTextPrimary();
    reconstructionDrawerGlobalToc();
    collapse();
    quickSearchClickEvent();

    const spy = new ScrollSpy({
        contentSelector: '.page-content .section',
        navSelector: '.localtoc a',
        scrollSelector: 'main' ,
        className: 'current',
        offsetTop: 64});

    const adjust = new AdjustHeight();

    $('.mdl-layout__content').focus();
});
