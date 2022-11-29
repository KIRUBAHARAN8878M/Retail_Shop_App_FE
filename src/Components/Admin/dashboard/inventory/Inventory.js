import React, { useContext } from "react";
import AdminContext from "../../../Context/adminContext";
import Search from "../../../Search";
import "./Inventory.css";
function Inventory() {
  const context = useContext(AdminContext);
  const { dashboardProduct ,getDashboardProduct} = context;
  return (
    <div className="mx-auto">
      <div className="comman_header">DASHBOARD/INVENTORY</div>
      <div className="comman mt-5">
        <div className="d-flex justify-content-between mt-5 m-3 ">
          <div>
          <div className="form-group d-flex justify-content-center  align-items-center">
      <label htmlFor="">Search</label>
      <input
        className="form-control mr-sm-2 me-2  ms-2 shadow-none"
        type="search"
        placeholder={"Avaliable Stock Value"}
        onChange={(e) =>getDashboardProduct(e.target.value)}
      />
    </div>

          </div>
          <div></div>
          <Search data={getDashboardProduct} lable={"Products"} />
        </div>
        <div className="m-3 table_responsive">
          <table className="table table-bordered  text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Bought</th>
                <th scope="col">Sold</th>
                <th scope="col">Available in Stock</th>
              </tr>
            </thead>
            <tbody>
              {
                dashboardProduct.length > 0 && dashboardProduct.map((item, index) => {
                  return <tr key={index}>
                    <td >{index + 1}</td>
                    <td>{item.product}</td>
                    <td>{item.bought}</td>
                    <td>{item.sold}</td>
                    <td>{item.avaliableStock}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
