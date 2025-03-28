export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">隐私政策</h1>

      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 信息收集</h2>
          <p className="mb-4">我们收集的信息包括但不限于：</p>
          <ul className="list-disc pl-6 mb-4">
            <li>您提供的个人信息（如姓名、联系方式）</li>
            <li>设备信息（如IP地址、浏览器类型）</li>
            <li>使用记录（如浏览历史、搜索记录）</li>
            <li>交易信息（如订单记录、支付信息）</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 信息使用</h2>
          <p className="mb-4">我们使用收集的信息用于：</p>
          <ul className="list-disc pl-6 mb-4">
            <li>提供、维护和改进我们的服务</li>
            <li>处理您的订单和请求</li>
            <li>向您发送服务通知和更新</li>
            <li>防止欺诈和提高安全性</li>
          </ul>
        </section>

        <section id="cookies" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cookie 使用</h2>
          <p className="mb-4">
            我们使用 Cookie
            和类似技术来提供和支持我们的服务。这些技术帮助我们了解您如何与我们的服务互动，从而改善用户体验。
          </p>
          <h3 className="text-xl font-semibold mb-2">Cookie 类型</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>必要的 Cookie：</strong>
              这些 Cookie
              对于网站的基本功能是必需的，无法在我们的系统中关闭。它们通常仅是对您所采取的操作的响应，例如设置您的隐私偏好、登录或填写表单。
            </li>
            <li>
              <strong>分析 Cookie：</strong>
              这些 Cookie
              帮助我们了解访问者如何与网站互动。所有信息都是匿名的，用于改进网站功能。
            </li>
            <li>
              <strong>功能性 Cookie：</strong>
              这些 Cookie
              使网站能够记住您做出的选择（如您的语言偏好），并提供增强的功能。
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Cookie 管理</h3>
          <p className="mb-4">
            您可以通过浏览器设置控制 Cookie。请注意，禁用某些 Cookie
            可能会影响网站的功能。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 信息共享</h2>
          <p className="mb-4">
            我们不会出售您的个人信息。在以下情况下，我们可能会共享您的信息：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>经您同意</li>
            <li>为完成您的请求所必需</li>
            <li>法律要求或政府请求</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 信息安全</h2>
          <p className="mb-4">
            我们采取适当的技术和组织措施来保护您的个人信息免受未经授权的访问、使用或披露。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 联系我们</h2>
          <p className="mb-4">
            如果您对我们的隐私政策有任何疑问，请通过以下方式联系我们：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>电子邮件：privacy@hidoo.com</li>
            <li>电话：+86 XXX XXXX XXXX</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
