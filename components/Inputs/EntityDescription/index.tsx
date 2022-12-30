const EntityDescription = () => {
    return (
        <div className="mt-3">
            <label htmlFor="description" className="text-sm">Description</label>
            <textarea
                id="description"
                name="description"
                className="block w-full rounded-md max-h-[200px] border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Add description (optional)"/>
        </div>
    );
};

export default EntityDescription;