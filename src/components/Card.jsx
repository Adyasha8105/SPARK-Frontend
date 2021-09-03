function ReviewCard(props) {
  const { about, number } = props;
  return (
    <div className="flex-col mt-6 md:w-1/6">
      <h4 className="text-dark font-semibold">
        {about}: &nbsp; <span className="text-lg text-gray-500">{number}</span>
      </h4>
    </div>
  );
}

export default ReviewCard;
