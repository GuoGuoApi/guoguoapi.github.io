// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // 点击页面其他区域关闭菜单的处理函数
    function handleClickOutsideMenu(e) {
        if (navLinks.classList.contains('active') && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    }

    function openMobileMenu() {
        navLinks.classList.add('active');
        document.body.classList.add('menu-open');
        document.addEventListener('keydown', handleMenuEscKey);
        // 添加点击外部区域关闭菜单的事件监听
        document.addEventListener('click', handleClickOutsideMenu);
        if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.removeEventListener('keydown', handleMenuEscKey);
        // 移除点击外部区域关闭菜单的事件监听
        document.removeEventListener('click', handleClickOutsideMenu);
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }

    function handleMenuEscKey(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (navLinks.classList.contains('active')) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            }
        });
        
        // 添加触摸事件支持
        hamburger.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }, { passive: false });
        
        // 确保导航链接在移动端可点击
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function(e) {
                // 点击链接后关闭菜单
                if (navLinks.classList.contains('active')) {
                    closeMobileMenu();
                }
                // 允许链接正常跳转
            });
            
            // 添加触摸事件支持
            link.addEventListener('touchstart', function(e) {
                // 允许默认行为，这样链接可以正常跳转
            }, { passive: true });
        });
    }

    // 设置当前页面的导航链接为激活状态
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinkElements = document.querySelectorAll('.nav-links a');
        navLinkElements.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveNavLink();

    initContactInfo();

    const backToTopButton = document.querySelector('.back-to-top');

    function onScroll() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    if (backToTopButton) {
        window.addEventListener('scroll', onScroll, { passive: true });
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

     // Markdown渲染功能
     const markdownContentElements = document.querySelectorAll('.markdown-content[data-file]');
     
     markdownContentElements.forEach(element => {
         const filePath = element.getAttribute('data-file');
         if (filePath) {
             renderMarkdownFile(filePath, element);
         }
     });
     
     // 平滑滚动功能
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function(e) {
             e.preventDefault();
             const targetId = this.getAttribute('href');
             const targetElement = document.querySelector(targetId);
             
             if (targetElement) {
                 targetElement.scrollIntoView({
                     behavior: 'smooth'
                 });
                 
                 // 关闭移动端菜单
                 if (navLinks && navLinks.classList.contains('active')) {
                     navLinks.classList.remove('active');
                 }
             }
         });
     });
     
     // 初始化搜索功能
    initSearch();
    // 初始化页面
    initPage();
    window.closeMobileMenu = closeMobileMenu;
});
 
 // 渲染Markdown文件
 function renderMarkdownFile(filePath, element) {
     // 显示加载状态
     element.innerHTML = '<div class="loading"><div class="spinner"></div> 正在加载内容...</div>';
     
     // 使用fetch加载Markdown文件
     fetch(filePath)
         .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return response.text();
         })
         .then(markdownText => {
             // 检查marked库是否加载
             if (typeof marked !== 'undefined') {
                 // 设置marked选项
                 marked.setOptions({
                     breaks: true,
                     gfm: true,
                     headerIds: true,
                     mangle: false
                 });
                 
                 // 渲染Markdown为HTML
                const htmlContent = marked.parse(markdownText);
                element.innerHTML = htmlContent;
                
                // 为渲染后的链接添加target="_blank"
                const links = element.querySelectorAll('a');
                links.forEach(link => {
                    if (link.href.startsWith('http')) {
                        link.setAttribute('target', '_blank');
                        link.setAttribute('rel', 'noopener noreferrer');
                    }
                });
                const imgs = element.querySelectorAll('img');
                imgs.forEach(img => {
                    img.setAttribute('loading', 'lazy');
                    img.setAttribute('decoding', 'async');
                });
            } else {
                element.innerHTML = '<div class="error">Markdown渲染库未加载，请检查配置。</div>';
            }
        })
         .catch(error => {
             console.error('加载Markdown文件失败:', error);
             element.innerHTML = `<div class="error">加载文件失败: ${error.message}</div>`;
         });
 }
 
 // 动态加载Markdown文件
 function loadMarkdownFile(filePath) {
     const contentContainer = document.querySelector('.markdown-content');
     if (contentContainer) {
         renderMarkdownFile(filePath, contentContainer);
     }
 }
 
 // 文件类型图标映射
 function getFileIcon(fileType) {
     const iconMap = {
         'pdf': '📄',
         'doc': '📝',
         'docx': '📝',
         'xls': '📊',
         'xlsx': '📊',
         'ppt': '📑',
         'pptx': '📑',
         'zip': '🗜️',
         'rar': '🗜️',
         'jpg': '🖼️',
         'jpeg': '🖼️',
         'png': '🖼️',
         'gif': '🖼️',
         'svg': '🖼️',
         'md': '📄',
         'txt': '📄',
         'default': '📎'
     };
     
     return iconMap[fileType.toLowerCase()] || iconMap['default'];
 }
 
 // 格式化日期
 function formatDate(dateString) {
     const date = new Date(dateString);
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     
     return `${year}-${month}-${day}`;
 }
 
 // 高亮当前活动导航项
 function highlightActiveNavItem() {
     const currentPath = window.location.pathname;
     const navLinks = document.querySelectorAll('.nav-links a');
     
     navLinks.forEach(link => {
         // 移除所有链接的active类
         link.classList.remove('active');
         
         // 为当前页面链接添加active类
         if (link.getAttribute('href') === currentPath || 
             (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
             link.classList.add('active');
         }
     });
 }
 
 // 初始化搜索功能
 function initSearch() {
     const searchInput = document.querySelector('.search-input');
     
     if (!searchInput) return;
     
     // 添加搜索输入事件
     searchInput.addEventListener('input', function() {
         const searchTerm = this.value.toLowerCase().trim();
         const searchableItems = document.querySelectorAll('.searchable');
         let hasResults = false;
         
         // 处理搜索逻辑
         searchableItems.forEach(item => {
             // 存储原始显示状态（如果有）
             if (!item.dataset.originalDisplay) {
                 item.dataset.originalDisplay = item.style.display || 'block';
             }
             
             const itemText = item.textContent.toLowerCase();
             const isMatch = searchTerm === '' || itemText.includes(searchTerm);
             
             if (isMatch) {
                 item.style.display = item.dataset.originalDisplay;
                 hasResults = true;
             } else {
                 item.style.display = 'none';
             }
         });
         
         // 检查是否需要显示无结果提示
         checkAndShowNoResults(searchTerm, hasResults);
     });
 }
 
 // 检查并显示无结果提示
 function checkAndShowNoResults(searchTerm, hasResults) {
     // 移除之前可能存在的提示
     const existingNoResults = document.querySelector('.no-results');
     if (existingNoResults) {
         existingNoResults.remove();
     }
     
     // 如果有搜索词但没有结果，显示提示
     if (searchTerm && !hasResults) {
         const searchContainer = document.querySelector('.search-container');
         if (searchContainer) {
             const noResults = document.createElement('div');
             noResults.className = 'no-results';
             noResults.style.cssText = `
                 text-align: center;
                 padding: 30px;
                 margin: 20px auto;
                 max-width: 500px;
                 background-color: #f8f9fa;
                 border-radius: 8px;
                 border: 1px solid #e9ecef;
             `;
             noResults.innerHTML = `
                 <i class="fas fa-search" style="font-size: 48px; color: #adb5bd; margin-bottom: 15px;"></i>
                 <h3 style="margin-bottom: 10px;">未找到相关内容</h3>
                 <p style="color: #6c757d;">没有找到与 "${searchTerm}" 相关的内容，请尝试其他关键词。</p>
             `;
             
             // 将提示插入到搜索框下方，内容列表上方
             const contentList = document.querySelector('#blog-list, #resources-list, #updates-container');
             if (contentList && contentList.parentNode) {
                 contentList.parentNode.insertBefore(noResults, contentList);
             }
         }
     }
 }
 
 // 重新初始化搜索功能（用于动态内容加载后）
function reinitSearch() {
    initSearch();
    // 触发一次搜索以更新结果
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        const event = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(event);
    }
}
 
 // 初始化联系方式功能
function initContactInfo() {
    // 尝试从HTML中获取邮箱地址，如果没有则使用默认值
    let emailAddress = 'guoguoapi@gmail.com';
    let githubUrl = 'https://github.com/guoguoapi';
    
    // 从页脚的邮箱链接获取地址
    const emailLink = document.querySelector('.footer-column a[href^="mailto:"]');
    if (emailLink) {
        emailAddress = emailLink.getAttribute('href').replace('mailto:', '');
    }
    
    // 从页脚的GitHub链接获取URL
    const githubLink = document.querySelector('.footer-column a[href*="github.com"]');
    if (githubLink) {
        githubUrl = githubLink.getAttribute('href');
    }
    
    // 定义联系方式数据
    const contactInfo = {
        email: { icon: 'fas fa-envelope', text: emailAddress, link: 'mailto:' + emailAddress },
        github: { icon: 'fab fa-github', text: 'GitHub个人主页', link: githubUrl },
        wechat: { icon: 'fab fa-weixin', text: '微信联系方式', link: 'javascript:void(0)' },
        phone: { icon: 'fas fa-phone', text: '180-7552-8165', link: 'tel:18075528165' }
    };
    
    // 为联系方式链接添加点击事件
    const footerColumns = document.querySelectorAll('.footer-column');
    footerColumns.forEach(column => {
        const h3 = column.querySelector('h3');
        if (h3 && h3.textContent.includes('联系方式')) {
            const links = column.querySelectorAll('ul li a');
            links.forEach(link => {
                // 跳过已经有onclick属性的链接（避免微信按钮出现两个弹窗）
                if (!link.hasAttribute('onclick')) {
                    // 确定点击的是哪种联系方式
                    let contactType = '';
                    if (link.querySelector('.fa-envelope')) {
                        contactType = 'email';
                    } else if (link.querySelector('.fa-github')) {
                        contactType = 'github';
                        // 强制移除href和target属性，确保不会自动跳转
                        link.setAttribute('href', '#');
                        link.removeAttribute('target');
                    } else if (link.querySelector('.fa-weixin')) {
                        contactType = 'wechat';
                    }
                    
                    // 只有当确定了联系方式类型时才添加事件监听器
                    if (contactType) {
                        // 移除任何现有的点击事件监听器
                        link.onclick = null;
                        // 添加新的点击事件监听器
                        link.addEventListener('click', function(e) {
                            // 确保阻止默认行为
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // 显示联系方式模态框
                            showContactModal(contactType, contactInfo);
                        }, true); // 使用捕获阶段确保先执行
                    }
                }
            });
        }
    });
}
 
 // 显示联系方式模态框
 function showContactModal(contactType, contactInfo) {
     // 检查是否已存在模态框
     let modal = document.getElementById('contact-modal');
     
     if (!modal) {
         // 创建模态框容器
         modal = document.createElement('div');
         modal.id = 'contact-modal';
         modal.className = 'modal';
         modal.style.cssText = `
             display: none;
             position: fixed;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             background-color: rgba(0, 0, 0, 0.6);
             z-index: 1000;
             align-items: center;
             justify-content: center;
             overflow: auto;
         `;
         document.body.appendChild(modal);
         
         // 添加点击模态框外部关闭功能
         modal.addEventListener('click', function(e) {
             if (e.target === modal) {
                 closeContactModal();
             }
         });
     }
     
     // 创建模态框内容
     let modalContent = '';
     
     // 根据联系方式类型显示不同内容
     if (contactType === 'wechat') {
         // 微信模态框
         modalContent = `
             <div class="modal-content" style="
                 background-color: white;
                 border-radius: 8px;
                 padding: 30px;
                 max-width: 400px;
                 width: 90%;
                 box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                 text-align: center;
             ">
                 <div style="position: relative;">
                     <span class="close-btn" onclick="closeContactModal()" style="
                         position: absolute;
                         top: -20px;
                         right: -20px;
                         font-size: 28px;
                         font-weight: bold;
                         cursor: pointer;
                         color: #333;
                         width: 30px;
                         height: 30px;
                         display: flex;
                         align-items: center;
                         justify-content: center;
                         background-color: white;
                         border-radius: 50%;
                         box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                     ">&times;</span>
                 </div>
                 <h3 style="margin-bottom: 20px; color: #333;">微信联系</h3>
                 <div style="
                     margin: 20px auto;
                     padding: 20px;
                     border: 1px solid #eaeaea;
                     border-radius: 8px;
                     text-align: center;
                     width: fit-content;
                 ">
                     <p style="font-size: 20px; font-weight: bold; color: #07C160; margin-bottom: 10px;">
                         请扫描下方二维码添加微信好友
                     </p>
                    <img src="storage/images/wechat-qrcode.jpg" alt="微信二维码" loading="lazy" decoding="async" width="200" height="200" style="
                        width: 200px;
                        height: 200px;
                        border-radius: 8px;
                        display: block;
                        margin: 0 auto;
                    ">
                 </div>
             </div>
         `;
     } else if (contactType === 'email') {
         // 邮箱模态框
         modalContent = `
             <div class="modal-content" style="
                 background-color: white;
                 border-radius: 8px;
                 padding: 30px;
                 max-width: 400px;
                 width: 90%;
                 box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                 text-align: center;
             ">
                 <div style="position: relative;">
                     <span class="close-btn" onclick="closeContactModal()" style="
                         position: absolute;
                         top: -20px;
                         right: -20px;
                         font-size: 28px;
                         font-weight: bold;
                         cursor: pointer;
                         color: #333;
                         width: 30px;
                         height: 30px;
                         display: flex;
                         align-items: center;
                         justify-content: center;
                         background-color: white;
                         border-radius: 50%;
                         box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                     ">&times;</span>
                 </div>
                 <h3 style="margin-bottom: 20px; color: #333;">邮箱地址</h3>
                 <div style="
                     margin: 20px 0;
                     padding: 15px;
                     background-color: #f8f9fa;
                     border-radius: 5px;
                     word-break: break-all;
                 ">
                     <span style="font-size: 18px; color: #495057; font-family: monospace;">${contactInfo.email.text}</span>
                 </div>
                 <div style="display: flex; gap: 15px; justify-content: center;">
                     <button onclick="copyToClipboard('${contactInfo.email.text}')" style="
                         padding: 10px 20px;
                         background-color: #007bff;
                         color: white;
                         border: none;
                         border-radius: 5px;
                         cursor: pointer;
                         font-size: 16px;
                     ">复制邮箱</button>
                     <a href="${contactInfo.email.link}" target="_blank" style="
                         padding: 10px 20px;
                         background-color: #28a745;
                         color: white;
                         border: none;
                         border-radius: 5px;
                         cursor: pointer;
                         font-size: 16px;
                         text-decoration: none;
                         display: inline-block;
                     ">发送邮件</a>
                 </div>
             </div>
         `;
     } else if (contactType === 'github') {
         // GitHub模态框
         modalContent = `
             <div class="modal-content" style="
                 background-color: white;
                 border-radius: 8px;
                 padding: 30px;
                 max-width: 400px;
                 width: 90%;
                 box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                 text-align: center;
             ">
                 <div style="position: relative;">
                     <span class="close-btn" onclick="closeContactModal()" style="
                         position: absolute;
                         top: -20px;
                         right: -20px;
                         font-size: 28px;
                         font-weight: bold;
                         cursor: pointer;
                         color: #333;
                         width: 30px;
                         height: 30px;
                         display: flex;
                         align-items: center;
                         justify-content: center;
                         background-color: white;
                         border-radius: 50%;
                         box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                     ">&times;</span>
                 </div>
                 <h3 style="margin-bottom: 20px; color: #333;">GitHub主页</h3>
                 <div style="
                     margin: 20px 0;
                     padding: 15px;
                     background-color: #f8f9fa;
                     border-radius: 5px;
                     word-break: break-all;
                 ">
                     <span style="font-size: 16px; color: #495057; font-family: monospace;">${contactInfo.github.link}</span>
                 </div>
                 <a href="${contactInfo.github.link}" target="_blank" style="
                     display: inline-block;
                     padding: 10px 30px;
                     background-color: #24292e;
                     color: white;
                     border: none;
                     border-radius: 5px;
                     cursor: pointer;
                     font-size: 16px;
                     text-decoration: none;
                     margin-top: 10px;
                 ">访问GitHub</a>
             </div>
         `;
     }
     
     // 设置模态框内容
     modal.innerHTML = modalContent;
     
     // 显示模态框
     modal.style.display = 'flex';
     
     // 添加键盘事件处理（ESC键关闭）
     document.addEventListener('keydown', handleEscKey);
     
     function handleEscKey(e) {
         if (e.key === 'Escape') {
             closeContactModal();
         }
     }
 }
 
 // 关闭联系方式模态框
 function closeContactModal() {
     const modal = document.getElementById('contact-modal');
     if (modal) {
         modal.style.display = 'none';
         // 移除键盘事件监听器
         document.removeEventListener('keydown', handleEscKey);
     }
 }
 
 // 复制到剪贴板
 function copyToClipboard(text) {
     navigator.clipboard.writeText(text)
         .then(() => {
             // 显示复制成功提示
             showCopyNotification();
         })
         .catch(err => {
             console.error('复制失败:', err);
         });
 }
 
 // 显示复制成功提示
 function showCopyNotification() {
     // 检查是否已存在提示
     let notification = document.querySelector('.copy-notification');
     if (notification) {
         notification.remove();
     }
     
     // 创建提示元素
     notification = document.createElement('div');
     notification.className = 'copy-notification';
     notification.style.cssText = `
         position: fixed;
         bottom: 30px;
         left: 50%;
         transform: translateX(-50%);
         background-color: #28a745;
         color: white;
         padding: 12px 24px;
         border-radius: 5px;
         font-weight: bold;
         z-index: 2000;
         box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
         animation: fadeInOut 2s ease-in-out;
     `;
     
     // 添加动画样式
     const styleSheet = document.createElement('style');
     styleSheet.textContent = `
         @keyframes fadeInOut {
             0% { opacity: 0; }
             20% { opacity: 1; }
             80% { opacity: 1; }
             100% { opacity: 0; }
         }
     `;
     document.head.appendChild(styleSheet);
     
     // 设置提示文本
     notification.textContent = '已复制到剪贴板';
     
     // 添加到页面
     document.body.appendChild(notification);
     
     // 2秒后移除提示
     setTimeout(() => {
         notification.remove();
         styleSheet.remove();
     }, 2000);
 }
 
// 初始化页面
function initPage() {
    highlightActiveNavItem();
    
    // 页面加载动画
    document.body.classList.add('loaded');
}

// 确保全局可用的函数
window.closeContactModal = closeContactModal;
window.copyToClipboard = copyToClipboard;
window.showCopyNotification = showCopyNotification;
window.handleEscKey = function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
};

// 通用前言解析
function parseFrontMatter(content) {
    const frontmatterRegex = /^---([\s\S]*?)---\s*/;
    const match = content.match(frontmatterRegex);
    const meta = {};
    let cleanContent = content;
    if (match && match[1]) {
        cleanContent = content.replace(frontmatterRegex, '');
        const lines = match[1].trim().split('\n');
        lines.forEach(line => {
            if (!line.trim() || line.trim().startsWith('#')) return;
            const i = line.indexOf(':');
            if (i > 0) {
                const key = line.substring(0, i).trim();
                let value = line.substring(i + 1).trim();
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.substring(1, value.length - 1).split(',').map(v => v.trim().replace(/['"]/g, ''));
                } else {
                    value = value.replace(/['"]/g, '');
                }
                meta[key] = value;
            }
        });
    }
    return { meta, content: cleanContent };
}

window.parseFrontMatter = parseFrontMatter;