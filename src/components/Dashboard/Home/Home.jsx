import PageTitle from "../../PageTitle/PageTitle";
import Card from "./Card/Card";
import Orders from "./Orders/Orders";
import Activity from "./Activity/Activity";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Home = () => {
  const [stats, setStats] = useState(null);
  const getStats = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/get-stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStats();
  }, []);
  return (
    <main id="main" className="main">
      <PageTitle name={"Dashboard"} />
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <Card
                name="Driver"
                value={stats?.drivers}
                icon="bi-person"
              ></Card>
              <Card
                name="Cars"
                value={stats?.cars}
                icon="bi-truck-front"
              ></Card>
              <Card
                name="Customer"
                value={stats?.customer}
                icon="bi-person"
              ></Card>

              <div className="col-12">
                <Orders />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Activity activity={stats?.activity} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
