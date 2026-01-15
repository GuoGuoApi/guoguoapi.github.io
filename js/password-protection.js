// 密码保护功能
// 注意：这只是前端密码保护，不是绝对安全的解决方案
// 请不要在代码中使用敏感信息作为密码

// 配置区域
const PASSWORD_CONFIG = {
    // 密码（建议使用强密码，这里只是示例）
    password: 'your_secure_password_here',
    
    // 会话存储键名
    sessionKey: 'site_access_granted',
    
    // 密码输入界面标题
    title: '网站访问验证',
    
    // 密码输入提示
    prompt: '请输入访问密码以查看内容',
    
    // 错误提示
    errorMessage: '密码错误，请重试'
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

// 授予用户访问权限
function grantAccess() {
    try {
        sessionStorage.setItem(PASSWORD_CONFIG.sessionKey, 'true');
        // 移除密码保护界面
        removePasswordScreen();
        // 显示页面内容
        showPageContent();
    } catch (error) {
        console.error('授予访问权限失败:', error);
    }
}

// 拒绝用户访问权限
function denyAccess() {
    try {
        sessionStorage.removeItem(PASSWORD_CONFIG.sessionKey);
        // 显示密码错误提示
        showErrorMessage();
    } catch (error) {
        console.error('拒绝访问权限失败:', error);
    }
}

// 创建密码保护界面
function createPasswordScreen() {
    // 检查是否已经存在密码界面
    if (document.getElementById('password-screen')) {
        return;
    }
    
    // 创建密码界面容器
    const passwordScreen = document.createElement('div');
    passwordScreen.id = 'password-screen';
    passwordScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1a1a2e;
        background-image: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        opacity: 1 !important;
        pointer-events: auto !important;
    `;
    
    // 创建密码输入表单
    const passwordForm = document.createElement('div');
    passwordForm.style.cssText = `
        background-color: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        width: 90%;
        text-align: center;
    `;
    
    // 添加标题
    const title = document.createElement('h2');
    title.textContent = PASSWORD_CONFIG.title;
    title.style.cssText = `
        margin-bottom: 20px;
        color: #333;
        font-size: 24px;
        font-weight: 600;
    `;
    
    // 添加提示信息
    const prompt = document.createElement('p');
    prompt.textContent = PASSWORD_CONFIG.prompt;
    prompt.style.cssText = `
        margin-bottom: 30px;
        color: #666;
        font-size: 16px;
    `;
    
    // 创建密码输入框
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password-input';
    passwordInput.placeholder = '请输入密码';
    passwordInput.style.cssText = `
        width: 100%;
        padding: 15px;
        margin-bottom: 20px;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 18px;
        box-sizing: border-box;
        transition: border-color 0.3s ease;
    `;
    
    // 添加输入框焦点效果
    passwordInput.addEventListener('focus', function() {
        this.style.borderColor = '#4f46e5';
        this.style.outline = 'none';
    });
    
    passwordInput.addEventListener('blur', function() {
        this.style.borderColor = '#e1e5e9';
    });
    
    // 创建错误提示元素
    const errorMessage = document.createElement('div');
    errorMessage.id = 'password-error';
    errorMessage.style.cssText = `
        color: #ef4444;
        margin-bottom: 20px;
        font-size: 14px;
        min-height: 20px;
        display: none;
    `;
    
    // 创建提交按钮
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = '验证密码';
    submitButton.style.cssText = `
        width: 100%;
        padding: 15px;
        background-color: #4f46e5;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.1s ease;
    `;
    
    // 添加按钮点击效果
    submitButton.addEventListener('click', function() {
        verifyPassword();
    });
    
    submitButton.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    submitButton.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    // 添加键盘事件监听（回车键提交）
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyPassword();
        }
    });
    
    // 组装密码表单
    passwordForm.appendChild(title);
    passwordForm.appendChild(prompt);
    passwordForm.appendChild(passwordInput);
    passwordForm.appendChild(errorMessage);
    passwordForm.appendChild(submitButton);
    
    // 将密码表单添加到密码界面
    passwordScreen.appendChild(passwordForm);
    
    // 确保document.body存在后再添加密码界面
if (document.body) {
    document.body.appendChild(passwordScreen);
    
    // 自动聚焦密码输入框
    setTimeout(() => {
        passwordInput.focus();
    }, 100);
} else {
    // 如果body不存在，等待DOM加载完成后再尝试
    setTimeout(() => {
        if (document.body) {
            document.body.appendChild(passwordScreen);
            passwordInput.focus();
        }
    }, 500);
}
}

// 移除密码保护界面
function removePasswordScreen() {
    const passwordScreen = document.getElementById('password-screen');
    if (passwordScreen) {
        passwordScreen.remove();
    }
}

// 显示密码错误提示
function showErrorMessage() {
    const errorElement = document.getElementById('password-error');
    if (errorElement) {
        errorElement.textContent = PASSWORD_CONFIG.errorMessage;
        errorElement.style.display = 'block';
        
        // 5秒后隐藏错误提示
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

// 验证密码
function verifyPassword() {
    const passwordInput = document.getElementById('password-input');
    if (!passwordInput) {
        return;
    }
    
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === PASSWORD_CONFIG.password) {
        grantAccess();
    } else {
        denyAccess();
        // 清空密码输入框
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// 显示页面内容
function showPageContent() {
    // 确保document.body存在
    if (document.body) {
        // 如果页面内容被隐藏，显示它
        const body = document.body;
        body.style.opacity = '1';
    }
}

// 隐藏页面内容
function hidePageContent() {
    // 确保document.body存在
    if (document.body) {
        const body = document.body;
        body.style.opacity = '0';
    }
}

// 初始化密码保护
function initPasswordProtection() {
    // 检查是否已经通过验证
    if (isAccessGranted()) {
        showPageContent();
        return;
    }
    
    // 首先创建密码保护界面，确保它能够显示
    createPasswordScreen();
    
    // 然后隐藏页面内容
    hidePageContent();
}

// 页面加载完成后初始化密码保护
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordProtection);
} else {
    // 确保DOM已经完全加载
    setTimeout(initPasswordProtection, 100);
}

// 确保密码保护在所有页面导航中都有效
// 监听页面加载事件
window.addEventListener('load', initPasswordProtection);

// 导出函数（如果需要在其他脚本中使用）
window.PasswordProtection = {
    isAccessGranted,
    grantAccess,
    denyAccess,
    initPasswordProtection
};