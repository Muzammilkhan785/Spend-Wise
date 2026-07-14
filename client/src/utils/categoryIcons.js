// Maps category icon names (stored in the DB) to react-icons components.
// The categories table has icon column with values like 'shopping-cart', 'car', etc.
// This file maps those strings to actual icon components.
 
import {
  FiBriefcase, FiMonitor, FiTrendingUp, FiShoppingCart,
  FiCoffee, FiTruck, FiHome, FiFilm, FiShoppingBag,
  FiHeart, FiBook, FiZap, FiMoreHorizontal, FiDollarSign,
} from 'react-icons/fi';
 
// Map: icon string (from DB) → React icon component
const iconMap = {
  'briefcase':        FiBriefcase,
  'laptop':           FiMonitor,
  'trending-up':      FiTrendingUp,
  'shopping-cart':    FiShoppingCart,
  'utensils':         FiCoffee,       // closest available
  'car':              FiTruck,
  'home':             FiHome,
  'film':             FiFilm,
  'bag':              FiShoppingBag,
  'heart':            FiHeart,
  'book':             FiBook,
  'zap':              FiZap,
  'more-horizontal':  FiMoreHorizontal,
};
 
// Returns the icon component for a given icon name, or a fallback
// Usage: const Icon = getCategoryIcon('shopping-cart');
//        Then in JSX: <Icon size={18} />
export const getCategoryIcon = (iconName) => {
  return iconMap[iconName] || FiDollarSign;  // FiDollarSign as fallback
};
