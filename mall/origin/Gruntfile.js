// 包装函数
module.exports = function(grunt) {

    // 任务配置，所有插件的配置信息
    grunt.initConfig({

        // 获取 package.json的信息
        pkg: grunt.file.readJSON('package.json'),

        // ugligy插件的配置信息
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: {
                    // except: ['require','fastclick','template','zepto']
                }
            },
            build: {
                files: {
                    '../js/main.min.js': ['js/main.js'],
                    '../js/404main.min.js': ['js/404main.js'],
                    '../js/common.min.js': ['js/common/fuze-util.js','js/common/fuze-api.js','js/common/router.js'],
                    '../js/common2.min.js': ['js/common/fuze-util.js','js/common/fuze-api.js'],
                    '../js/controller/mycenter/addressController.min.js': ['js/controller/mycenter/addressController.js'],
                    '../js/controller/mycenter/aftsaleController.min.js': ['js/controller/mycenter/aftsaleController.js'],
                    '../js/controller/mycenter/expressController.min.js': ['js/controller/mycenter/expressController.js'],
                    '../js/controller/mycenter/fillInfoReturnController.min.js': ['js/controller/mycenter/fillInfoReturnController.js'],
                    '../js/controller/mycenter/myorderController.min.js': ['js/controller/mycenter/myorderController.js'],
                    '../js/controller/mycenter/orderDetailController.min.js': ['js/controller/mycenter/orderDetailController.js'],
                    '../js/controller/mycenter/returnDetailController.min.js': ['js/controller/mycenter/returnDetailController.js'],
                    '../js/controller/mycenter/scheduleController.min.js': ['js/controller/mycenter/scheduleController.js'],
                    '../js/controller/mycenter/welcomeController.min.js': ['js/controller/mycenter/welcomeController.js'],
                    '../js/controller/aboutus/contactusController.min.js': ['js/controller/aboutus/contactusController.js'],
                    '../js/controller/aboutus/cultureController.min.js': ['js/controller/aboutus/cultureController.js'],
                    '../js/controller/aboutus/profileController.min.js': ['js/controller/aboutus/profileController.js'],
                    '../js/controller/404Controller.min.js': ['js/controller/404Controller.js'],
                    '../js/controller/aboutUsController.min.js': ['js/controller/aboutUsController.js'],
                    '../js/controller/cartController.min.js': ['js/controller/cartController.js'],
                    '../js/controller/conFigureController.min.js': ['js/controller/conFigureController.js'],
                    '../js/controller/contactUsController.min.js': ['js/controller/contactUsController.js'],
                    '../js/controller/createMessageController.min.js': ['js/controller/createMessageController.js'],
                    '../js/controller/createOrderController.min.js': ['js/controller/createOrderController.js'],
                    '../js/controller/designController.min.js': ['js/controller/designController.js'],
                    '../js/controller/faqController.min.js': ['js/controller/faqController.js'],
                    '../js/controller/fuzeController.min.js': ['js/controller/fuzeController.js'],
                    '../js/controller/gameController.min.js': ['js/controller/gameController.js'],
                    '../js/controller/gameItemController.min.js': ['js/controller/gameItemController.js'],
                    '../js/controller/gameListController.min.js': ['js/controller/gameListController.js'],
                    '../js/controller/handleController.min.js': ['js/controller/handleController.js'],
                    '../js/controller/homeController.min.js': ['js/controller/homeController.js'],
                    '../js/controller/itemController.min.js': ['js/controller/itemController.js'],
                    '../js/controller/latestController.min.js': ['js/controller/latestController.js'],
                    '../js/controller/employController.min.js': ['js/controller/employController.js'],
                    '../js/controller/employDetailController.min.js': ['js/controller/employDetailController.js'],
                    '../js/controller/messageDetailsController.min.js': ['js/controller/messageDetailsController.js'],
                    '../js/controller/mycenterController.min.js': ['js/controller/mycenterController.js'],
                    '../js/controller/aboutUsController.min.js': ['js/controller/aboutUsController.js'],
                    '../js/controller/newMationController.min.js': ['js/controller/newMationController.js'],
                    '../js/controller/payController.min.js': ['js/controller/payController.js'],
                    '../js/controller/serveController.min.js': ['js/controller/serveController.js'],
                    '../js/controller/cjController.min.js': ['js/controller/cjController.js'],
                    '../js/controller/serviceCenterController.min.js': ['js/controller/serviceCenterController.js'],
                    '../js/controller/successController.min.js': ['js/controller/successController.js'],
                    '../js/controller/partnersController.min.js': ['js/controller/partnersController.js'],
                    '../js/controller/releaseController.min.js': ['js/controller/releaseController.js'],
                    '../js/controller/m.releaseController.min.js': ['js/controller/m.releaseController.js'],
                    '../js/controller/VRController.min.js': ['js/controller/VRController.js'],
                    '../js/controller/weixinController.min.js': ['js/controller/weixinController.js'],
                    '../js/controller/liveController.min.js': ['js/controller/liveController.js'],
                    '../js/controller/m.liveController.min.js': ['js/controller/m.liveController.js'],
                    '../js/controller/fuzeOSController.min.js': ['js/controller/fuzeOSController.js'],
                    '../js/controller/fuzefansController.min.js': ['js/controller/fuzefansController.js'],
                    '../js/controller/applyController.min.js': ['js/controller/applyController.js'],
                    '../js/controller/joinInController.min.js': ['js/controller/joinInController.js'],
                    '../js/controller/termsController.min.js': ['js/controller/termsController.js'],
                    '../js/controller/activepageController.min.js': ['js/controller/activepageController.js'],
                    '../js/modules/address.manage.min.js': ['js/modules/address.manage.js'],
                    '../js/modules/goods.number.min.js': ['js/modules/goods.number.js'],
                    '../js/modules/header.min.js': ['js/modules/header.js']
                }
            }
        },

        // jshint插件的配置信息
        jshint: {
            build: ['Gruntfile.js','js/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: true,
                keepSpecialComments: -1
            },
            compress: {
                files: {
                    '../css/main.min.css': ['css/main.css','css/cart.css','css/item.css','css/order.css','css/mycenter.css','css/faq.css'],
                    '../css/f1main.min.css': [ 'css/main.css','css/fuze.css' ],
                    '../css/employ.css': ['css/employ.css'],
                    '../css/employDetail.css': ['css/employDetail.css'],
                    '../css/aboutus/employ.css': ['css/aboutus/employ.css'],
                    '../css/aboutus/contactus.css': ['css/aboutus/contactus.css'],
                    '../css/aboutus/culture.css': ['css/aboutus/culture.css'],
                    '../css/aboutus/profile.css': ['css/aboutus/profile.css'],
                    '../css/mycenter/address.css': ['css/mycenter/address.css'],
                    '../css/mycenter/express.css': ['css/mycenter/express.css'],
                    '../css/mycenter/fillInfo.css': ['css/mycenter/fillInfo.css'],
                    '../css/mycenter/myorder.css': ['css/mycenter/myorder.css'],
                    '../css/mycenter/order.css': ['css/mycenter/order.css'],
                    '../css/mycenter/orderDetail.css': ['css/mycenter/orderDetail.css'],
                    '../css/mycenter/schedule.css': ['css/mycenter/schedule.css'],
                    '../css/mycenter/welcome.css': ['css/mycenter/welcome.css'],
                    '../css/mycenter/returnDetail.css': ['css/mycenter/returnDetail.css'],
                    '../css/main.css': ['css/main.css'],
                    '../css/404.css': ['css/404.css'],
                    '../css/aboutUs.css': ['css/aboutUs.css'],
                    '../css/conFigure.css': ['css/conFigure.css'],
                    '../css/contactUs.css': ['css/contactUs.css'],
                    '../css/createMessage.css': ['css/createMessage.css'],
                    '../css/createOrder.css': ['css/createOrder.css'],
                    '../css/design.css': ['css/design.css'],
                    '../css/faq.css': ['css/faq.css'],
                    '../css/fuze.css': ['css/fuze.css'],
                    '../css/game.css': ['css/game.css'],
                    '../css/gameItem.css': ['css/gameItem.css'],
                    '../css/gameList.css': ['css/gameList.css'],
                    '../css/gamePay.css': ['css/gamePay.css'],
                    '../css/handle.css': ['css/handle.css'],
                    '../css/header.css': ['css/header.css'],
                    '../css/home.css': ['css/home.css'],
                    '../css/latest.css': ['css/latest.css'],
                    '../css/messageDetails.css': ['css/messageDetails.css'],
                    '../css/newMation.css': ['css/newMation.css'],
                    '../css/pagination.css': ['css/pagination.css'],
                    '../css/partners.css': ['css/partners.css'],
                    '../css/productDetail-f1.css': ['css/productDetail-f1.css'],
                    '../css/productDetail-hd.css': ['css/productDetail-hd.css'],
                    '../css/release.css': ['css/release.css'],
                    '../css/serve.css': ['css/serve.css'],
                    '../css/cj.css': ['css/cj.css'],
                    '../css/serviceCenter.css': ['css/serviceCenter.css'],
                    '../css/slide.css': ['css/slide.css'],
                    '../css/success.css': ['css/success.css'],
                    '../css/video-js.css': ['css/video-js.css'],
                    '../css/VR.css': ['css/VR.css'],
                    '../css/webuploader.css': ['css/webuploader.css'],
                    '../css/weixin.css': ['css/weixin.css'],
                    '../css/fuzeOS.css': ['css/fuzeOS.css'],
                    '../css/fuzefans.css': ['css/fuzefans.css'],
                    '../css/apply.css': ['css/apply.css'],
                    '../css/joinIn.css': ['css/joinIn.css'],
                    '../css/terms.css': ['css/terms.css'],
                    '../css/hack/fuze_designie8.css': ['css/hack/fuze_designie8.css'],
                    '../css/hack/fuze_handleie8.css': ['css/hack/fuze_handleie8.css'],
                    '../css/hack/fuze_ie8.css': ['css/hack/fuze_ie8.css'],
                    '../css/activepage.css': ['css/activepage.css']
                }
            }
        },

        usemin: {
            html: ['../index.html','../404.html','../fuze.html','../handle.html','../design.html','../m.release.html','../release.html','../live.html','../m.live.html'],
            options: {
                blockReplacements: {
                    css: function (block) {
                        return '<link rel="stylesheet" href="' + block.dest + '?v='+grunt.file.readJSON('package.json').version+'">';
                    },
                    js: function (block) {
                        return '<script src="'+block.dest+'?v='+grunt.file.readJSON('package.json').version+'"></script>';
                    }
                }
            }
        },

        copy: {
            html: {
                expand: true,                   // 需要该参数
                cwd: '',
                src: ['index.html','404.html','fuze.html','design.html','handle.html','m.release.html','release.html','live.html','m.live.html','package.json','pages/*.html','active/*.html','pages/mycenter/*.html','pages/aboutus/*.html','pages/employ/*.html','js/lib/*.js',"css/font_face/*"],         // 会把page文件夹+文件复制过去
                dest: '../../mall'
            }
        },
        // watch插件的配置信息（自动化）

        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: '../img' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        },
        watch: {
            build: {
                files: ['js/*.js', 'css/*.css'],
                tasks: ['uglify','cssmin','copy','usemin'],
                options: { spawn: false}
            }
        }
    });

    // 告诉grunt我们将适用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');         // 语法错误检查
    grunt.loadNpmTasks('grunt-contrib-watch');          // 自动监听
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');         // 文件拼接
    grunt.loadNpmTasks('grunt-usemin');                 // 静态html标签替换
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
    // grunt.registerTask('default', ['uglify','cssmin','watch']);
    // grunt.registerTask('default', ['newer:uglify','newer:cssmin','newer:copy','newer:usemin','watch']);
    grunt.registerTask('default', ['uglify','cssmin','copy','usemin','imagemin']);
};