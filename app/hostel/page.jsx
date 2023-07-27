"use client"
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const AddHostelForm = ({ onAddHostel }) => {
    const initialFormData = {
        name: '',
        location: '',
        contactPhone: [''],
        roomTypes: [],
        images: [],
        locationMapUrl: '',
        wifiAvailability: false,
        waterFilterAvailability: false,
        hostelType: '',
        cautionDeposit: 0,
        currentBillPayment: '',
        waterBillPayment: '',
        nightCurfewTime: '',
        cleaningFrequency: '',
        parkingFacility: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddPhoneNumber = () => {
        setFormData({
            ...formData,
            contactPhone: [...formData.contactPhone, ''],
        });
    };


    const handlePhoneNumberChange = (index, value) => {
        const updatedPhoneNumbers = [...formData.contactPhone];
        updatedPhoneNumbers[index] = value;
        setFormData({
            ...formData,
            contactPhone: updatedPhoneNumbers,
        });
    };

    const handleRemovePhoneNumber = (index) => {
        const updatedPhoneNumbers = formData.contactPhone.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            contactPhone: updatedPhoneNumbers,
        });
    };


    const handleAddRoomType = () => {
        setFormData((prevData) => ({
            ...prevData,
            roomTypes: [...prevData.roomTypes, { type: '', price: 0, description: '' }],
        }));
    };

    const handleRoomTypeChange = (index, field, value) => {
        setFormData((prevData) => {
            const roomTypes = [...prevData.roomTypes];
            roomTypes[index][field] = value;
            return { ...prevData, roomTypes };
        });
    };

    const handleRemoveRoomType = (indexToRemove) => {
        setFormData((prevData) => {
            const roomTypes = prevData.roomTypes.filter((_, index) => index !== indexToRemove);
            return { ...prevData, roomTypes };
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const images = files.map((file) => URL.createObjectURL(file));
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...images],
        }));
    };

    const handleRemoveImage = (indexToRemove) => {
        setFormData((prevData) => {
            const images = prevData.images.filter((_, index) => index !== indexToRemove);
            return { ...prevData, images };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddHostel(formData);
        setFormData(initialFormData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500" htmlFor="name">
                    Hostel Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500" htmlFor="location">
                    Hostel Location
                </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500" htmlFor="location">
                    Location Link
                </label>
                <input
                    type="text"
                    id="locationMapUrl"
                    name="locationMapUrl"
                    value={formData.locationMapUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500">Contact Numbers</label>
                {formData.contactPhone.map((phoneNumber, index) => (
                    <div key={index} className="flex">
                        <input
                            type="tel"
                            name={`contactPhone[${index}]`}
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                            className="w-full p-2 border rounded mr-2 mb-2"
                            required
                        />
                        {formData.contactPhone.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemovePhoneNumber(index)}
                                className="m-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                            >
                                <FiTrash2 />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddPhoneNumber}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Phone Number
                </button>
            </div>



            {/* Hostel Type */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500" htmlFor="hostelType">
                    Hostel Type
                </label>
                <select
                    id="hostelType"
                    name="hostelType"
                    value={formData.hostelType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Hostel Type</option>
                    <option value="Men">Men's Hostel</option>
                    <option value="Women">Women's Hostel</option>
                </select>
            </div>

            {/* Caution Deposit */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500" htmlFor="cautionDeposit">
                    Caution Deposit
                </label>
                <input
                    type="number"
                    id="cautionDeposit"
                    name="cautionDeposit"
                    value={formData.cautionDeposit}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {/* Night Entry Time */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500" htmlFor="nightCurfewTime">
                    Night Entry Time
                </label>
                <input
                    type="time"
                    id="nightCurfewTime"
                    name="nightCurfewTime"
                    value={formData.nightCurfewTime}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {/* Water Filter Availability */}

            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500">
                    <input
                        type="checkbox"
                        name="wifiAvailability"
                        checked={formData.wifiAvailability}
                        onChange={handleInputChange}
                    />
                    wifi Available
                </label>
            </div>


            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500">
                    <input
                        type="checkbox"
                        name="waterFilterAvailability"
                        checked={formData.waterFilterAvailability}
                        onChange={handleInputChange}
                    />
                    Water Filter Available
                </label>
            </div>

            {/* Current Bill Extra */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500">
                    <input
                        type="checkbox"
                        name="currentBillExtra"
                        checked={formData.currentBillExtra}
                        onChange={handleInputChange}
                    />
                    Current Bill Extra
                </label>
            </div>

            {/* Water Bill Extra */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500">
                    <input
                        type="checkbox"
                        name="waterBillExtra"
                        checked={formData.waterBillExtra}
                        onChange={handleInputChange}
                    />
                    Water Bill Extra
                </label>
            </div>

            {/* Cleaning Availability */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500">
                    <input
                        type="checkbox"
                        name="cleaningAvailability"
                        checked={formData.cleaningAvailability}
                        onChange={handleInputChange}
                    />
                    Provide Room Cleaning
                </label>
            </div>

            {/* Parking Facility */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500">
                    <input
                        type="checkbox"
                        name="parkingFacility"
                        checked={formData.parkingFacility}
                        onChange={handleInputChange}
                    />
                    Parking Facility Available
                </label>
            </div>

            {/* Room Types */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500">Room Types</label>
                {formData.roomTypes.map((roomType, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={`roomType-${index}`} className="block mb-2">
                                Type
                            </label>
                            <input
                                type="text"
                                id={`roomType-${index}`}
                                name={`roomTypes[${index}].type`}
                                value={roomType.type}
                                onChange={(e) => handleRoomTypeChange(index, 'type', e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor={`roomPrice-${index}`} className="block mb-2">
                                Price
                            </label>
                            <input
                                type="number"
                                id={`roomPrice-${index}`}
                                name={`roomTypes[${index}].price`}
                                value={roomType.price}
                                onChange={(e) => handleRoomTypeChange(index, 'price', parseFloat(e.target.value))}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor={`roomDescription-${index}`} className="block mb-2">
                                Description
                            </label>
                            <input
                                type="text"
                                id={`roomDescription-${index}`}
                                name={`roomTypes[${index}].description`}
                                value={roomType.description}
                                onChange={(e) => handleRoomTypeChange(index, 'description', e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveRoomType(index)}
                            className="col-span-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Remove Room Type
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddRoomType}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Room Type
                </button>
            </div>


            {/* Image Gallery */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold text-blue-500">Image Gallery</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                />
                {formData.images.length > 0 && (
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.images.map((imageUrl, index) => (
                            <div key={index} className="relative">
                                <img src={imageUrl} alt={`Hostel Image ${index + 1}`} className="w-full h-40 object-cover rounded" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Hostel
            </button>
        </form>
    );
};

export default AddHostelForm;