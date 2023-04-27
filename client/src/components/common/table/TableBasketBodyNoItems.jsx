const TableBasketBodyNoItems = () => {
  return (
    <tr className="border-b bg-gray-300 text-center font-bk-bt">
      <td
        colSpan={"6"}
        className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
      >
        Тут пока ничего нет
      </td>
    </tr>
  );
};

export default TableBasketBodyNoItems;
