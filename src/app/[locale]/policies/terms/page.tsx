export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">服务条款</h1>

      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. 服务协议的接受与修改
          </h2>
          <p className="mb-4">
            欢迎您使用我们的服务。通过访问或使用我们的服务，您同意受本服务条款的约束。我们保留随时修改这些条款的权利，修改后的条款将在网站上公布。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 用户注册与账户安全</h2>
          <p className="mb-4">
            您需要注册账户才能使用某些服务。您同意提供真实、准确、完整的注册信息，并及时更新这些信息。您有责任保护您的账户安全。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 隐私保护</h2>
          <p className="mb-4">
            我们重视您的隐私。我们按照隐私政策收集和使用您的个人信息。使用我们的服务即表示您同意我们按照隐私政策处理您的个人信息。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 知识产权</h2>
          <p className="mb-4">
            网站上的所有内容，包括但不限于文字、图片、音频、视频、软件、程序、代码等，均由我们或我们的内容提供商拥有知识产权。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 免责声明</h2>
          <p className="mb-4">
            我们的服务按&quot;现状&quot;提供，不提供任何明示或暗示的保证。我们不对服务的中断或任何信息、产品、服务的及时性、准确性负责。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 联系我们</h2>
          <p className="mb-4">
            如果您对我们的服务条款有任何疑问，请通过以下方式联系我们：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>电子邮件：legal@hidoo.com</li>
            <li>电话：+86 XXX XXXX XXXX</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
