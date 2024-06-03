import { useEffect, useState } from "react";
import "./sorting.css";

function SortData() {
  const [users, setUsers] = useState([]);
  const baseURL = "https://dummyjson.com/users";
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("ascending");

  async function fetchListOfData() {
    try {
      setLoading(true);
      const res = await fetch(`${baseURL}`);
      const result = await res.json();
      if (result && result.users && result.users.length > 0) {
        setLoading(false);
        sort !== "" ? handleSort(result.users) : setUsers(result.users);
      }
      console.log(users, "users");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  function handleSort(listOfData) {
    let cpyList = [...listOfData];
    if (sort === "ascending") {
      cpyList = cpyList.sort((firstUser, secondUser) =>
        firstUser.firstName > secondUser.firstName ? 1 : -1
      );
      setUsers(cpyList);
    } else if (sort === "descending") {
      cpyList = cpyList.sort((firstUser, secondUser) =>
        firstUser.firstName > secondUser.firstName ? -1 : 1
      );
      setUsers(cpyList);
    }
  }

  useEffect(() => {
    fetchListOfData();
  }, []);

  useEffect(() => {
    handleSort(users);
  }, [sort]);
  console.log(sort);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="sort-data-container">
      <h1>Sort Data</h1>
      <div className="sort-dropdown-container">
        <select
          name="sort"
          id=""
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Please Select Opton</option>
          <option value="ascending" id="ascending">
            A-Z
          </option>
          <option value="descending" id="descending">
            Z-A
          </option>
        </select>
        <ul>
          {users && users.length > 0
            ? users.map((userItem) => (
                <li key={userItem.id}>
                  <p>{userItem.firstName}</p>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default SortData;
