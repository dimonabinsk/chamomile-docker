import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Input } from "@material-tailwind/react";

import { getCatalog } from "../../../../store/catalog";
import config from "../../../../config/config.json";

const BASE_URL = config.API_BASE_URL;

const Search = () => {
  const [isSearch, setSearch] = useState("");
  const catalog = useSelector(getCatalog());

  const handlerChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  function getFilterCatalog(catalog, search) {
    return search && catalog
      ? catalog.filter((prod) => {
          const name = prod.name.toLowerCase();
          const search = isSearch.toLowerCase();
          return name.indexOf(search) !== -1;
        })
      : null;
  }

  const filterCatalog = getFilterCatalog(catalog, isSearch);

  return (
    <div className="relative z-50 mb-1">
      <div className="">
        <Input
          variant="outlined"
          label="Поиск..."
          color="green"
          className=" text-graphite dark:text-main-white"
          value={isSearch}
          onInput={handlerChangeSearch}
          name="search"
        />
      </div>
      {filterCatalog && (
        <div className="absolute overflow-y-auto rounded-lg top-14 max-h-80 bg-main-white dark:bg-main-black-body">
          <ul className="max-w-xs divide-y divide-gray-200 dark:divide-gray-700 sm:max-w-sm">
            {filterCatalog.map((prod, i) => (
              <li
                className="truncate hover:bg-blue-gray-200 dark:hover:bg-green-4 "
                key={prod._id + i}
                onClick={() => setSearch("")}
              >
                <Link
                  to={(location) => {
                    switch (location.pathname) {
                      case "/":
                        return {
                          ...location,
                          pathname: `catalog/${prod._id}`,
                        };

                      default:
                        return {
                          ...location,
                          pathname: `../catalog/${prod._id}`,
                        };
                    }
                  }}
                  className="flex items-center px-2 py-3 space-x-4 sm:p-5"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={BASE_URL + prod.imgMain}
                      alt={prod.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-main-white">
                      {prod.name}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-main-white">
                    ₽{prod.price}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
