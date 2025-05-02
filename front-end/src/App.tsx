import "./App.css";
import { BookForm } from "./MediaForms/BookForm.tsx";
import { RegisterForm } from "./authForms/RegisterForm.tsx";
import { LoginForm } from "./authForms/LoginForm.tsx";
import { BooksLibrary } from "./books/BooksLibrary.tsx";

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
