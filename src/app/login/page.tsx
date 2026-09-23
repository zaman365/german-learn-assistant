import LoginForm from "@/components/login-form";
export default function LoginPage() {
  return (
    <main className="auth-screen">
      <section className="auth-story">
        <div className="brand">
          <span className="brand-mark">D</span>
          <span>
            Deutsch.<small>YOUR LEARNING COMPANION</small>
          </span>
        </div>
        <h1 className="serif" lang="de">
          Ein Schritt.
          <br />
          Jeden Tag.
        </h1>
        <p>
          Your path from a confident B2 foundation to professional C1 German. A
          clear next step, every time you return.
        </p>
        <div className="chips">
          <span className="badge">B2 → C1</span>
          <span className="badge">DTB C1</span>
          <span className="badge">Toward C2</span>
        </div>
      </section>
      <section className="auth-panel">
        <LoginForm />
      </section>
    </main>
  );
}
