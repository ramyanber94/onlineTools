import React, { useState } from "react";

export const AddProducts = () => {
  type Variation = {
    type: string;
    value: string;
  };

  // State to keep track of variations
  const [variations, setVariations] = useState<Variation[]>([
    { type: "", value: "" },
  ]);

  // Function to handle adding a new variation
  const handleAddVariation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newVariations = [...variations, { type: "", value: "" }];
    setVariations(newVariations);
  };

  // Function to handle deleting a variation
  const handleDeleteVariation = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.preventDefault();
    const newVariations = variations.filter((_, i) => i !== index);
    setVariations(newVariations);
  };

  // Function to handle changes in the input/select fields
  const handleVariationChange = (
    index: number,
    field: keyof Variation,
    value: string,
  ) => {
    const newVariations = [...variations];
    newVariations[index][field] = value;
    setVariations(newVariations);
  };

  return (
    <div className="flex flex-col gap-0">
      <h1 className="pl-7 pt-6 text-2xl font-bold dark:text-gray-100">
        Add Product
      </h1>
      <div>
        <span className="pl-7 pt-2 text-sm font-semibold text-indigo-600 dark:text-gray-100">
          Dashboard
          <span className="pl-3 text-gray-400">
            {">"}
            <span className="pl-3 text-sm font-semibold text-indigo-600 dark:text-gray-100">
              Product List
              <span className="pl-3 text-gray-400">
                {">"}
                <span className="pl-3 text-sm font-semibold text-gray-600 dark:text-gray-100">
                  Add Product
                </span>
              </span>
            </span>
          </span>
        </span>
      </div>
      <form className="m-6 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
        <form className="col-start-1 col-end-4 space-y-3 rounded-lg border-2 border-gray-100 p-5 shadow-md md:row-span-2">
          <h1 className="text-xl font-bold">General Information</h1>
          <div className="text-base font-semibold dark:text-gray-100">
            Product Name
            <input
              type="text"
              placeholder="Type product name here"
              className="border-1.5 mt-1 w-full rounded-lg border-gray-200 bg-gray-50 px-2.5 py-1.5 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="text-base font-semibold dark:text-gray-100">
            Description
            <textarea
              placeholder="Type product description here"
              className="border-1.5 mt-1 h-64 w-full rounded-lg border-gray-200 bg-gray-50 px-2.5 py-1.5 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </form>
        <form className="col-4 space-y-3 rounded-lg border-2 border-gray-100 p-5 shadow-md">
          <h1 className="text-xl font-bold">Category</h1>
          <div className="text-base font-semibold dark:text-gray-100">
            Product Category
            <select
              required
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-left font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option>Select a category</option>
              <option>Category 1</option>
            </select>
          </div>
          <div className="text-base font-semibold dark:text-gray-100">
            Product Tags
            <select
              required
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-left font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option>Select a tag</option>
              <option>Tag 1</option>
            </select>
          </div>
        </form>
        <form className="col-4 space-y-3 rounded-lg border-2 border-gray-100 p-5 shadow-md">
          <h1 className="text-xl font-bold">Upload to</h1>
          <div className="text-base font-semibold dark:text-gray-100">
            All stores
            <div className="mt-2 space-y-2">
              <div id="store" className="flex items-center space-x-4 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                ></input>
                <span>Store 1</span>
              </div>
              <div id="store" className="flex items-center space-x-4 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                ></input>
                <span>Store 2</span>
              </div>
            </div>
          </div>
        </form>
        <form className="col-start-1 col-end-4 row-start-3 space-y-3 rounded-lg border-2 border-gray-100 p-5 shadow-md">
          <h1 className="text-xl font-bold">Media</h1>
          <div className="text-base font-semibold dark:text-gray-100">
            Photo
            <div className="border-1.5 mt-1 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 py-10 font-normal text-gray-500">
              <div className="mb-3">
                <img
                  className="h-auto max-w-none"
                  src="/photo-icon.png"
                  alt="photo-icon"
                />
              </div>
              <span className="mb-6 font-normal text-gray-500">
                Drag and drop image here, or click add image
              </span>
              <div>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-indigo-500 px-4 py-2.5 text-white hover:bg-indigo-600"
                >
                  <span>Add Image</span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="text-base font-semibold dark:text-gray-100">
            Video
            <div className="border-1.5 mt-1 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 py-10 font-normal text-gray-500">
              <div className="mb-3">
                <img
                  className="h-auto max-w-none"
                  src="/video-icon.png"
                  alt="video-icon"
                />
              </div>
              <span className="mb-6 font-normal text-gray-500">
                Drag and drop video here, or click add video
              </span>
              <div>
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer rounded-md bg-indigo-500 px-4 py-2.5 text-white hover:bg-indigo-600"
                >
                  Add Video
                </label>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </form>
        <form className="col-start-1 col-end-4 space-y-3 rounded-lg border-2 border-gray-100 p-5 shadow-md">
          <h1 className="text-xl font-bold">Pricing</h1>
          <div className="text-base font-semibold dark:text-gray-100">
            Base Price
            <div className="flex flex-row items-center">
              <h1 className="text-xl font-bold">$</h1>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                required
                className="border-1.5 ml-1 mt-1 w-full rounded-lg border-gray-200 bg-gray-50 px-2.5 py-1.5 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            <div className="text-base font-semibold dark:text-gray-100">
              Discount Type
              <select className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-left font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600">
                <option>Select a discount type</option>
                <option>Discount Type 1</option>
              </select>
            </div>
            <div className="text-base font-semibold dark:text-gray-100">
              Discount Percentage (%)
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="Type discount percentage"
                className="border-1.5 mt-1 w-full rounded-lg border-gray-200 bg-gray-50 px-2.5 py-1.5 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="text-base font-semibold dark:text-gray-100">
              Tax Class
              <select className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-left font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600">
                <option>Select a tax class</option>
                <option>Tax Class 1</option>
              </select>
            </div>
            <div className="text-base font-semibold dark:text-gray-100">
              VAT Amount (%)
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="Type VAT amount"
                className="border-1.5 mt-1 w-full rounded-lg border-gray-200 bg-gray-50 px-2.5 py-1.5 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
        </form>
        <form className="col-start-1 col-end-4 space-y-3 rounded-lg border-2 border-gray-100 p-5 shadow-md">
          <h1 className="text-xl font-bold">Inventory</h1>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-base font-semibold dark:text-gray-100">
              SKU
              <input
                type="text"
                placeholder="Type product SKU here"
                className="border-1.5 mt-1 w-full rounded-lg border-gray-200 bg-gray-50 px-2.5 py-1.5 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="text-base font-semibold dark:text-gray-100">
              Barcode
              <input
                type="text"
                placeholder="Product barcode"
                className="border-1.5 mt-1 w-full rounded-lg border-gray-200 bg-gray-50 px-2.5 py-1.5 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="text-base font-semibold dark:text-gray-100">
              Quantity
              <input
                type="text"
                placeholder="Type product quantity here"
                className="border-1.5 mt-1 w-full rounded-lg border-gray-200 bg-gray-50 px-2.5 py-1.5 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
        </form>

        <form className="col-start-1 col-end-4 space-y-3 rounded-lg border-2 border-gray-100 p-5 shadow-md">
          <h1 className="text-xl font-bold">Variation</h1>
          <div>
            {variations.map((variation, index) => (
              <div key={index} className="mt-3 grid grid-cols-3 gap-3">
                <div className="text-base font-semibold dark:text-gray-100">
                  Variation Type
                  <select
                    value={variation.type}
                    onChange={(e) =>
                      handleVariationChange(index, "type", e.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-left font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="">Select a variation</option>
                    <option value="Variation Type 1">Variation Type 1</option>
                    <option value="Variation Type 2">Variation Type 2</option>
                    <option value="Variation Type 3">Variation Type 3</option>
                  </select>
                </div>
                <div className="text-base font-semibold dark:text-gray-100">
                  Variation
                  <input
                    type="text"
                    value={variation.value}
                    onChange={(e) =>
                      handleVariationChange(index, "value", e.target.value)
                    }
                    placeholder="Variation"
                    className="border-1.5 mt-1 w-full rounded-lg border-gray-200 bg-gray-50 px-2.5 py-1.5 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <button
                  onClick={(event) => handleDeleteVariation(event, index)}
                  className="mt-7 rounded-md bg-red-500 px-2 py-2 text-base font-normal text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              onClick={handleAddVariation}
              className="mt-5 rounded-md bg-indigo-500 px-4 py-2.5 text-base font-normal text-white hover:bg-indigo-600"
            >
              Add Variant
            </button>
          </div>
        </form>
        <div className="col-start-1 col-end-4 mt-6 space-y-3">
          <button
            type="button"
            className="w-full rounded-md border border-gray-500 bg-white py-2.5 text-base font-normal text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-500 py-2.5 text-base font-normal text-white hover:bg-indigo-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};
