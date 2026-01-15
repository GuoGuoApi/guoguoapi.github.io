// 密码保护重定向脚本
// 简单可靠的密码保护解决方案

// 配置区域
const PASSWORD_CONFIG = {
    // 重定向到密码验证页面
    passwordPage: 'password.html',
    
    // 会话存储键名
    sessionKey: 'site_access_granted'
};

// 检查用户是否已经通过验证
function isAccessGranted() {
    try {
        return sessionStorage.getItem(PASSWORD_CONFIG.sessionKey) === 'true';
    } catch (error) {
        console.error('检查访问权限失败:', error);
        return false;
    }
}

// 重定向到密码验证页面
function redirectToPasswordPage() {
    // 保存当前页面的URL，以便验证后重定向回来
    const currentUrl = window.location.pathname;
    const redirectUrl = encodeURIComponent(currentUrl);
    window.location.href = `${PASSWORD_CONFIG.passwordPage}?redirect=${redirectUrl}`;
}

// 初始化密码保护
function initPasswordProtection() {
    // 检查当前页面是否是密码验证页面
    const isPasswordPage = window.location.pathname.endsWith(PASSWORD_CONFIG.passwordPage);
    
    // 如果不是密码验证页面，且没有通过验证，则重定向
    if (!isPasswordPage && !isAccessGranted()) {
        // 没有通过验证，重定向到密码页面
        redirectToPasswordPage();
    }
}

// 页面加载完成后初始化密码保护
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordProtection);
} else {
    initPasswordProtection();
}