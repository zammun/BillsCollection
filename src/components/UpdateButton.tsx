interface UpdateButtonProps {
  pending: boolean;
}

const UpdateButton = ({ pending }: UpdateButtonProps) => {
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white p-2 rounded-md cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed max-w-96"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;