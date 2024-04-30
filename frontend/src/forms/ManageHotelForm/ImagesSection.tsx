import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  const validateImageDimensions = async (imageFiles: FileList) => {
    const isValidDimensions = await Promise.all(
      Array.from(imageFiles).map(async (file) => {
        return new Promise<boolean>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && e.target.result) {
              const img = new Image();
              img.src = e.target.result.toString();
              img.onload = () => {
                const aspectRatio = img.width / img.height;
                resolve(aspectRatio === 16 / 9);
              };
            }
          };
          reader.readAsDataURL(file);
        });
      })
    );

    return isValidDimensions.every((isValid) => isValid);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4 border-mint">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group" key={url}>
                <img
                  src={url}
                  className="min-h-full object-cover"
                  alt="Uploaded"
                />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: async (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength != 4) {
                return "The total images must be 4";
              }

              // Validate aspect ratio
              const isValidDimensions = await validateImageDimensions(
                imageFiles
              );
              if (!isValidDimensions) {
                return "Images must have a 16:9 aspect ratio";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
