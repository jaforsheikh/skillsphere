"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaUserGraduate,
  FaShieldAlt,
  FaArrowRight,
  FaPen,
  FaTimes,
  FaImage,
  FaUpload,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [openModal, setOpenModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    imageFile: null,
  });

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?callbackUrl=/profile");
    }
  }, [isPending, session, router]);

  const openEditModal = () => {
    setForm({
      name: user?.name || "",
      imageFile: null,
    });

    setPreview(user?.image || "/images/avatar.png");
    setOpenModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, and WEBP images are allowed");
      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    setForm({ ...form, imageFile: file });
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!form.imageFile) {
      return user?.image || "/images/avatar.png";
    }

    const formData = new FormData();
    formData.append("image", form.imageFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Image upload failed");
    }

    return data.imageUrl;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setUpdating(true);

    try {
      const uploadedImageUrl = await uploadImage();

      const result = await authClient.updateUser({
        name: form.name,
        image: uploadedImageUrl,
      });

      if (result?.error) {
        toast.error(result.error.message || "Profile update failed");
        return;
      }

      toast.success("Profile updated successfully");
      setOpenModal(false);

      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 pt-24 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-300">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 pt-24 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-300">Redirecting to login...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl md:p-12">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-blue-500/50 bg-slate-900">
              <Image
                src={user.image || "/images/avatar.png"}
                alt={user.name || "User"}
                fill
                sizes="144px"
                className="object-cover"
              />

              <button
                type="button"
                onClick={openEditModal}
                className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
                title="Edit profile"
              >
                <FaPen />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
                    My Profile
                  </p>

                  <h1 className="mt-3 text-4xl font-black md:text-5xl">
                    {user.name || "SkillSphere User"}
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={openEditModal}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-400 px-5 py-3 text-sm font-bold text-blue-300 transition hover:bg-blue-600 hover:text-white"
                >
                  <FaPen />
                  Edit Profile
                </button>
              </div>

              <p className="mt-4 flex items-center justify-center gap-3 text-slate-300 md:justify-start">
                <FaEnvelope className="text-blue-400" />
                {user.email || "No email found"}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <FaUserGraduate className="text-3xl text-blue-400" />
              <h2 className="mt-4 text-xl font-bold">Learner Status</h2>
              <p className="mt-2 text-slate-400">
                Active SkillSphere learner
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <FaShieldAlt className="text-3xl text-green-400" />
              <h2 className="mt-4 text-xl font-bold">Account Access</h2>
              <p className="mt-2 text-slate-400">
                Protected profile route
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <FaArrowRight className="text-3xl text-yellow-400" />
              <h2 className="mt-4 text-xl font-bold">Next Step</h2>
              <p className="mt-2 text-slate-400">
                Continue exploring courses
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-8 py-4 font-bold transition hover:bg-blue-700"
            >
              Browse Courses
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {openModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Edit Profile</h2>

              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-red-500"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Upload Profile Picture
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-blue-400/50 bg-slate-950 px-6 py-8 text-center transition hover:border-blue-400 hover:bg-blue-500/10">
                  <FaUpload className="text-3xl text-blue-400" />
                  <span className="mt-3 text-sm font-semibold text-white">
                    Choose image from your computer
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    JPG, PNG, WEBP — Max 2MB
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {preview && (
                <div className="mt-5 flex flex-col items-center justify-center">
                  <p className="mb-3 flex items-center gap-2 text-sm text-slate-400">
                    <FaImage className="text-blue-400" />
                    Preview
                  </p>
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-blue-500/50 bg-slate-950">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      unoptimized
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                disabled={updating}
                className="mt-6 w-full rounded-full bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}