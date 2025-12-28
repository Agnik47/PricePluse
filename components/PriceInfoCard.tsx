import Image from "next/image";

interface Props {
  title: string;
  iconSrc: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

const PriceInfoCard = ({ title, iconSrc, value, trend = 'neutral' }: Props) => {
  const getTrendColor = () => {
    switch(trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  const getTrendIcon = () => {
    switch(trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  return (
    <div className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
            <Image 
              src={iconSrc}
              alt={title}
              width={20}
              height={20}
              className="opacity-70"
            />
          </div>
          <div>
            <div className="text-sm text-white/60 font-medium">{title}</div>
            <div className="text-2xl font-light text-white mt-1">{value}</div>
          </div>
        </div>
        <div className={`text-sm font-medium ${getTrendColor()}`}>
          {getTrendIcon()}
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Updated 2h ago</span>
          <span className={`font-medium ${getTrendColor()}`}>
            {trend === 'up' ? 'Rising' : trend === 'down' ? 'Falling' : 'Stable'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PriceInfoCard