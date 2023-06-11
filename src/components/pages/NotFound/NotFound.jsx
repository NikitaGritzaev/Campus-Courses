import { Link } from "react-router-dom";
const NotFound = () => (
  <div className="mt-5">
    <h1 className="text-center">Страница не найдена!</h1>
    <hr />
    <h2 className="text-center">
      Пожалуйста, проверьте введенный адрес
    </h2>
    <h2 className="text-center">
      ↓ Или вернитесь на бесполезную главную страницу ↓
    </h2>
    <h3 className="text-center mt-2"><Link to="/">Жми сюда</Link></h3>
  </div>
);

export default NotFound;
