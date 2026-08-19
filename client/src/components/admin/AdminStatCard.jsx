import { motion } from "framer-motion";

const AdminStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClassName = "bg-indigo-50 text-indigo-600",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        y: -3,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        p-5
        shadow-[0_4px_20px_rgba(15,23,42,0.03)]
        transition-shadow
        duration-300
        hover:shadow-[0_12px_35px_rgba(15,23,42,0.07)]
      "
    >
      {/* Decorative glow */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/[0.03] blur-2xl transition-all duration-500 group-hover:bg-indigo-500/[0.08]" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-500">{title}</p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: delay + 0.15,
            }}
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {value ?? 0}
          </motion.p>

          {subtitle && (
            <p className="mt-1.5 text-[11px] font-medium text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${iconClassName}
          `}
        >
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
};

export default AdminStatCard;
