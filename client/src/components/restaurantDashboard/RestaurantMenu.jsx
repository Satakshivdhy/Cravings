import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
const defaultMenuItems = [
  {
    id: 1,
    name: "Spicy Burger",
    description: "Grilled beef patty with lettuce and tomato",
    cost: "$12.50",
    category: "Burgers",
    type: "Fast Food",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
    status: "Available",
  },
  {
    id: 2,
    name: "Chicken Pizza",
    description: "Classic pizza topped with grilled chicken",
    cost: "$14.00",
    category: "Pizza",
    type: "Italian",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80",
    status: "Out of Stock",
  },
  {
    id: 3,
    name: "Veggie Wrap",
    description: "Fresh vegetables wrapped in soft tortilla",
    cost: "$8.99",
    category: "Wraps",
    type: "Healthy",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
    status: "Available",
  },
];

const RestaurantMenu = ({ menuItems = defaultMenuItems }) => {
  return (
    <div className="overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <button className="rounded  flex items-center gap-2 text-[var(--color-primary)] px-4 py-2 text-sm font-medium border hover:bg-orange-700 hover:text-white">
          <IoMdAddCircleOutline/> Add New Item
        </button>
      </div>
      <div className="bg-(--color-base-200) p-4 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-(--color-secondary)">
              <th className="text-left py-2">Item Name & Description</th>
              <th className="text-left py-2">Cost</th>
              <th className="text-left py-2">Category & type</th>
              {/* <th className="text-left py-2">Type</th> */}
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Controls</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <tr key={item.id} className="border-b border-(--color-secondary)">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-sm text-(--color-neutral)">{item.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{item.cost}</td>
                  <td className="py-3">
                    <div className="flex flex-col">
                        <span className="font-semibold">{item.category}</span>
                        <span className="text-sm text-(--color-neutral)">{item.type}</span>
                      </div>
                  </td>
                  {/* <td className="py-3">{item.type || "-"}</td> */}
                  <td className="py-3">
                    <select
                      defaultValue={item.status}
                      className="rounded border border-(--color-secondary) px-2 py-1 text-sm"
                    >
                      <option value="Available">Available</option>
                      <option value="Sold Out">Sold Out</option>
                      <option value="Discontinued">Discontinued</option>
                    </select>
                  </td>
                  <td className="py-3">{item.controls || "-"}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 text-sm rounded bg-blue-500 text-white">
                        Edit
                      </button>
                      <button className="px-2 py-1 text-sm rounded bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-(--color-secondary)">
                <td colSpan="7" className="text-center py-4 text-(--color-neutral)">
                  No menu items yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantMenu;
