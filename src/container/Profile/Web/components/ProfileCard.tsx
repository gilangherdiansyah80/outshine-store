import { User, Shield, Phone, Mail, Calendar, Loader2 } from "lucide-react";
import type { UserProfile } from "@/services/Profile/useGetProfile";

interface ProfileCardProps {
  profile?: UserProfile;
  isLoading: boolean;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function ProfileCard({ profile, isLoading }: ProfileCardProps) {
  return (
    <div className="sticky top-10 space-y-5">
      {/* Avatar & Identity */}
      <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white space-y-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center border-2 border-white/20 overflow-hidden">
            {isLoading ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-white" />
            )}
          </div>

          {isLoading ? (
            <div className="space-y-2">
              <div className="h-6 w-36 bg-white/10 rounded-xl animate-pulse mx-auto" />
              <div className="h-4 w-48 bg-white/10 rounded-lg animate-pulse mx-auto" />
            </div>
          ) : (
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight">
                {profile?.fullName || "Guest User"}
              </h2>
              <p className="text-white/50 text-sm font-medium">
                {profile?.email}
              </p>
            </div>
          )}
        </div>

        {!isLoading && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10">
              <Shield size={14} className="text-blue-400" />
              <span className="text-[11px] font-black uppercase tracking-widest text-white/70">
                {profile?.roleName || "Customer"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Account Details */}
      {!isLoading && profile && (
        <div className="bg-white rounded-[2.5rem] p-6 border-2 border-slate-50 space-y-4">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
            Account Info
          </p>
          <div className="space-y-3">
            {[
              { icon: Phone, label: "Phone", value: profile.phone || "-" },
              { icon: Mail, label: "Email", value: profile.email },
              {
                icon: Calendar,
                label: "Member Since",
                value: formatDate(profile.createdAt),
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-50 border-2 border-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {label}
                  </p>
                  <p className="text-sm font-black text-[#0F172A] truncate">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center py-2">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
          Outshine Store v1.0.0
        </p>
      </div>
    </div>
  );
}
