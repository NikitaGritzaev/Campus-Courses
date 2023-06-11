import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../store/thunk/accountAPI";
import { getNavbarType } from "./NavBarTypes";
import {toast} from "react-toastify";
function NavBarContainer({isLight}) {
  const account = useSelector((store) => store.account);
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logout());
    }
    finally {
      toast.success("Возвращайтесь ещё!");
    }
  };
  
  return (
    <NavBar
      type={getNavbarType(account?.authorized, account?.roles)}
      name={account?.profile?.fullName}
      onLogout={onLogout}
      isLight={isLight}
    />
  );
}

export default NavBarContainer;
