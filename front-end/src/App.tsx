import "./App.css";
import { BookForm } from "./MediaForms/BookForm.tsx";
import { RegisterForm } from "./AuthForms/RegisterForm.tsx";
import { LoginForm } from "./AuthForms/LoginForm.tsx";
import { BooksLibrary } from "./Books/BooksLibrary.tsx";

function App() {

  return (
    <>
    create account
      <RegisterForm />
      login
      <LoginForm/>
      <BookForm />
      <BooksLibrary/>
    </>
  );
}

export default App;
