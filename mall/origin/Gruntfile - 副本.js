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
                    'dist/js/main.min.js': ['js/main.js'],

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
                    'dist/css/main.min.css': ['css/main.css','css/cart.css','css/item.css','css/order.css','css/mycenter.css','css/faq.css'],
                    'dist/css/f1main.min.css': ['css/main.css','css/fuze.css'
                    ],
                    'dist/css/employ.css': ['css/employ.css'],
                    'dist/css/employDetail.css': ['css/employDetail.css'],
                    'dist/css/aboutus/employ.css': ['css/aboutus/employ.css'],
                    'dist/css/aboutus/contactus.css': ['css/aboutus/contactus.css'],
                    'dist/css/aboutus/culture.css': ['css/aboutus/culture.css'],
                    'dist/css/aboutus/profile.css': ['css/aboutus/profile.css'],

                    'dist/css/mycenter/address.css': ['css/mycenter/address.css'],
                    'dist/css/mycenter/express.css': ['css/mycenter/express.css'],
                    'dist/css/mycenter/fillInfo.css': ['css/mycenter/fillInfo.css'],
                    'dist/css/mycenter/myorder.css': ['css/mycenter/myorder.css'],
                    'dist/css/mycenter/order.css': ['css/mycenter/order.css'],
                    'dist/css/mycenter/orderDetail.css': ['css/mycenter/orderDetail.css'],
                    'dist/css/mycenter/schedule.css': ['css/mycenter/schedule.css'],
                    'dist/css/mycenter/welcome.css': ['css/mycenter/welcome.css'],
                    'dist/css/mycenter/returnDetail.css': ['css/mycenter/returnDetail.css'],
                    'dist/css/main.css': ['css/main.css'],
                    'dist/css/404.css': ['css/404.css'],
                    'dist/css/aboutUs.css': ['css/aboutUs.css'],
                    'dist/css/conFigure.css': ['css/conFigure.css'],
                    'dist/css/contactUs.css': ['css/contactUs.css'],
                    'dist/css/createMessage.css': ['css/createMessage.css'],
                    'dist/css/createOrder.css': ['css/createOrder.css'],
                    'dist/css/design.css': ['css/design.css'],
                    'dist/css/faq.css': ['css/faq.css'],
                    'dist/css/fuze.css': ['css/fuze.css'],
                    'dist/css/game.css': ['css/game.css'],
                    'dist/css/gameItem.css': ['css/gameItem.css'],
                    'dist/css/gameList.css': ['css/gameList.css'],
                    'dist/css/gamePay.css': ['css/gamePay.css'],
                    'dist/css/handle.css': ['css/handle.css'],
                    'dist/css/header.css': ['css/header.css'],
                    'dist/css/home.css': ['css/home.css'],
                    'dist/css/latest.css': ['css/latest.css'],
                    'dist/css/messageDetails.css': ['css/messageDetails.css'],
                    'dist/css/newMation.css': ['css/newMation.css'],
                    'dist/css/pagination.css': ['css/pagination.css'],
                    'dist/css/partners.css': ['css/partners.css'],
                    'dist/css/productDetail-f1.css': ['css/productDetail-f1.css'],
                    'dist/css/productDetail-hd.css': ['css/productDetail-hd.css'],
                    'dist/css/release.css': ['css/release.css'],
                    'dist/css/serve.css': ['css/serve.css'],
                    'dist/css/cj.css': ['css/cj.css'],
                    'dist/css/serviceCenter.css': ['css/serviceCenter.css'],
                    'dist/css/slide.css': ['css/slide.css'],
                    'dist/css/success.css': ['css/success.css'],
                    'dist/css/video-js.css': ['css/video-js.css'],
                    'dist/css/VR.css': ['css/VR.css'],
                    'dist/css/webuploader.css': ['css/webuploader.css'],
                    'dist/css/weixin.css': ['css/weixin.css'],
                    'dist/css/fuzeOS.css': ['css/fuzeOS.css'],
                    'dist/css/fuzefans.css': ['css/fuzefans.css'],
                    'dist/css/apply.css': ['css/apply.css'],
                    'dist/css/joinIn.css': ['css/joinIn.css'],
                    'dist/css/terms.css': ['css/terms.css'],
                    'dist/css/hack/fuze_designie8.css': ['css/hack/fuze_designie8.css'],
                    'dist/css/hack/fuze_handleie8.css': ['css/hack/fuze_handleie8.css'],
                    'dist/css/hack/fuze_ie8.css': ['css/hack/fuze_ie8.css']
                }
            }
        },

        usemin: {
            html: ['dist/index.html','dist/fuze.html','dist/handle.html','dist/design.html','dist/m.release.html','dist/release.html','dist/live.html','dist/m.live.html'],
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
                src: ['index.html','fuze.html','design.html','handle.html','m.release.html','release.html','live.html','m.live.html','package.json','pages/*.html','active/*.html','pages/mycenter/*.html','pages/aboutus/*.html','pages/employ/*.html','js/lib/*.js',"js/common/config.js","css/font_face/*"],         // 会把page文件夹+文件复制过去
                dest: 'dist'
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
                    dest: 'dist/img' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
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