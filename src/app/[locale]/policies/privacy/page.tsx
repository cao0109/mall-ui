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

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cookie 使用</h2>
          <p className="mb-4">
            我们使用 Cookie
            和类似技术来提供和支持我们的服务。这些技术帮助我们了解您如何与我们的服务互动，从而改善用户体验。
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
      </div>
    </div>
  );
}
