import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "@inertiajs/react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import FormError from "./form-error";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { CSRF } from "./csrf-input";

type FormType = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    image: File | undefined;
    _token: string;
};

const AddUser = ({ onOpenChange, ...props }: DialogProps) => {
    const { data, setData, post, errors, reset, processing } = useForm<FormType>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        image: undefined,
        _token: "", // Add CSRF token field
    });

    const [passwordError, setPasswordError] = useState<string | null>(null);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (data.password !== data.password_confirmation) {
            setPasswordError("Passwords do not match.");
            return;
        }
        setPasswordError(null);

        post(route("users.store"), {
            onSuccess: () => {
                toast.success("User has Been Created Successfully");
                reset();
                onOpenChange?.(false);
            },
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <Sheet onOpenChange={onOpenChange} {...props}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create New User</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                    {/* Hidden CSRF token input */}
            <CSRF setData={setData} />

                    <div className="space-y-1">
                        <Label>Full Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Full Name"
                        />
                        <FormError error={errors.name} />
                    </div>

                    <div className="space-y-1">
                        <Label>Email Address</Label>
                        <Input
                            value={data.email}
                            type="email"
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Email"
                        />
                        <FormError error={errors.email} />
                    </div>

                    <div className="space-y-1">
                        <Label>Profile Image</Label>
                        <Input
                            type="file"
                            onChange={(e) => setData("image", e.target.files?.[0])}
                        />
                        <FormError error={errors.image} />
                    </div>

                    <div className="space-y-1">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                        />
                        <FormError error={errors.password} />
                    </div>

                    <div className="space-y-1">
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                        />
                        <FormError error={errors.password_confirmation} />
                        {passwordError && (
                            <p className="text-sm text-red-500">{passwordError}</p>
                        )}
                    </div>
                    <Button disabled={processing}>
                        {processing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {!processing ? "Save" : "Saving"}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default AddUser;
