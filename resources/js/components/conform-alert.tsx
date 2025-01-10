import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";

type Props = AlertDialogProps & {
  message: string;
  title: string;
  onConfirm: () => void;
};

const ConfirmAlert = ({
  onOpenChange,
  onConfirm,
  message,
  title,
  ...props
}: Props) => {
  return (
    <AlertDialog onOpenChange={onOpenChange} {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => onConfirm?.()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAlert;
