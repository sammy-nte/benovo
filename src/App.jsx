import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import SiteLayout from "./layouts/SiteLayout";
import ProjectModal from "./components/ProjectModal";
import { useDispatch, useSelector } from "react-redux";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Explore from "./pages/Explore";
import MobileMenu from "./components/MobileMenu";
import Register from "./pages/Register";
import SignRegLayout from "./layouts/SignRegLayout";
import SignIn from "./pages/SignIn";
import NgoPageLayout from "./layouts/Ngo-Layouts/NgoPageLayout";
import Dashboard from "./pages/ngo_pages/Dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "./config/firebase";
import { loader as DashboardLoader } from "./pages/ngo_pages/Dashboard";
import { loader as ProfileLoader } from "./pages/ngo_pages/Profile";
import Profile from "./pages/ngo_pages/Profile";
import ProfileEdit from "./components/Ngo-Components/ProfileEdit";
import { setEmail, setUid } from "./redux/redux-features/ngoSlice";
import Campaigns from "./pages/ngo_pages/Campaigns";
import NgoProfile from "./pages/NgoProfile";
import { loader as NgoProfileLoader } from "./pages/NgoProfile";
import { loader as CampaignLoader } from "./pages/ngo_pages/Campaigns";
import { useEffect } from "react";
import { addProject } from "./redux/redux-features/projectSlice";
import { collection, getDocs } from "firebase/firestore";
import EditCampaign from "./components/Ngo-Components/EditCampaign";
import MaterialDonation from "./components/MaterialDonation";
import DeactivateCampaign from "./components/Ngo-Components/DeactivateCampaign";
import { data } from "autoprefixer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="explore" element={<Explore />} />
        <Route
          path="ngo-profile/:ngoId"
          element={<NgoProfile />}
          loader={NgoProfileLoader}
        />
      </Route>
      <Route element={<SignRegLayout />}>
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="ngo" element={<NgoPageLayout />}>
        <Route
          path="dashboard"
          index
          element={<Dashboard />}
          loader={DashboardLoader}
        />
        <Route path="profile" element={<Profile />} loader={ProfileLoader} />
        <Route path="campaigns" element={<Campaigns />} loader={CampaignLoader} />
      </Route>
    </Route>
  )
);

function App() {
  const auth = getAuth(app);
  const dispatch = useDispatch();

  const { modalData } = useSelector(store => store.modalData);
  const { editCampaign } = useSelector(store => store.campaignEdit);
  // const { menu } = useSelector(store => store.menu);
  const { materialForm } = useSelector(store => store.donateForm);
  const { Dedetails  } = useSelector(store => store.deactivate);

  useEffect(
    () => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          dispatch(setEmail(user.email));
          dispatch(setUid(user.uid));
        }
      });
      return () => unsubscribe();
    },
    [auth, dispatch]
  );

  useEffect(() => {
    async function getAllCampaigns() {
      try {
        const querySnapshot = await getDocs(collection(db, "ActiveCampaigns"));
        const data = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        dispatch(addProject(data));
      } catch (error) {
        console.error(error);
      }
    }
    getAllCampaigns();
  }, []);

  return (
    <div>
      {modalData && <ProjectModal />}
      {editCampaign && <EditCampaign />}
      {materialForm.length > 0 && <MaterialDonation />}
      {Dedetails && <DeactivateCampaign />}
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
