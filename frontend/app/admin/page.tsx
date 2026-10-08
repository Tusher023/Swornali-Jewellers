'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Package,
  Users,
  CreditCard,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Scale,
  RefreshCw,
  X,
  Upload,
  Phone,
  Mail,
  Calendar,
  Building,
  Check,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { formatPrice, goldRates as initialGoldRates, products as initialProducts, Product, Category } from '../../lib/products';

// Types for Orders
type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CRAFTING' | 'QUALITY_CHECK' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface AdminOrder {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  items: {
    name: string;
    quantity: number;
    size?: string;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Bank Transfer' | 'Cash on Delivery';
  paymentStatus: 'PAID' | 'UNPAID';
  status: OrderStatus;
  date: string;
  deliveryAddress: string;
  assignedArtisan?: string;
}

// Types for Employees & Payroll
interface Employee {
  id: string;
  name: string;
  role: string;
  department: 'Workshop' | 'Showroom' | 'Design & QC' | 'Accounts';
  phone: string;
  email: string;
  joinDate: string;
  baseSalary: number;
  bonus: number;
  payrollStatus: 'PAID' | 'PENDING' | 'PROCESSING';
  lastPaidDate?: string;
  nid: string;
}

// Types for Custom Bespoke Requests
interface CustomRequest {
  id: string;
  customerName: string;
  phone: string;
  type: string;
  budget: string;
  metal: string;
  deadline: string;
  status: 'New' | 'Designing' | 'Crafting' | 'Completed';
  notes: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'employees' | 'custom' | 'settings'>('overview');

  // Live Gold Rates State
  const [goldRates, setGoldRates] = useState(initialGoldRates);
  const [rateEditModalOpen, setRateEditModalOpen] = useState(false);
  const [tempRates, setTempRates] = useState(initialGoldRates);

  // Products State
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<{
    name: string;
    category: Category;
    price: number;
    material: string;
    purity: string;
    weightGrams: number;
    stone: string;
    description: string;
    image: string;
    stock: number;
    badge: string;
  }>({
    name: '',
    category: 'Rings',
    price: 95000,
    material: '22K Gold',
    purity: '22K',
    weightGrams: 8.5,
    stone: 'None',
    description: '',
    image: '',
    stock: 5,
    badge: 'New Arrival',
  });

  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [showUrlFallback, setShowUrlFallback] = useState<boolean>(false);

  // Orders State
  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: 'SW-98241',
      customerName: 'Tasnim Jahan',
      phone: '+880 1712-345678',
      email: 'tasnim.jahan@gmail.com',
      items: [
        {
          name: 'Celeste Diamond Solitaire Ring',
          quantity: 1,
          size: '14',
          price: 185000,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
        },
      ],
      totalAmount: 185000,
      paymentMethod: 'bKash',
      paymentStatus: 'PAID',
      status: 'CRAFTING',
      date: '2026-10-08 10:30 AM',
      deliveryAddress: 'House 42, Road 11, Banani, Dhaka-1213',
      assignedArtisan: 'Master Goldsmith Haripada Karmakar',
    },
    {
      id: 'SW-98240',
      customerName: 'Anowar Hossain Chowdhury',
      phone: '+880 1819-876543',
      email: 'anowar.c@chittagonggroup.com',
      items: [
        {
          name: 'Mayur Royal Bridal Choker Set',
          quantity: 1,
          price: 495000,
          image: 'https://images.unsplash.com/photo-1599643478524-fb66f70a00bf?w=800&q=80',
        },
      ],
      totalAmount: 495000,
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'PAID',
      status: 'QUALITY_CHECK',
      date: '2026-10-07 04:15 PM',
      deliveryAddress: 'GEC Circle, Nasirabad Housing, Chittagong',
      assignedArtisan: 'Senior Artisan Dulal Sen',
    },
    {
      id: 'SW-98239',
      customerName: 'Farhana Akhter',
      phone: '+880 1911-223344',
      email: 'farhana.design@yahoo.com',
      items: [
        {
          name: 'Noor Emerald & Polki Jhumkas',
          quantity: 1,
          price: 125000,
          image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80',
        },
      ],
      totalAmount: 125000,
      paymentMethod: 'bKash',
      paymentStatus: 'PAID',
      status: 'SHIPPED',
      date: '2026-10-06 02:20 PM',
      deliveryAddress: 'Uttara Sector 7, Road 14, Dhaka',
    },
    {
      id: 'SW-98238',
      customerName: 'Sheikh Rafiqul Islam',
      phone: '+880 1622-998877',
      email: 'rafiqul.sheikh@hotmail.com',
      items: [
        {
          name: 'Padma Lotus Filigree Kada',
          quantity: 2,
          price: 330000,
          image: 'https://images.unsplash.com/photo-1611591475879-112e3e5b3f11?w=800&q=80',
        },
      ],
      totalAmount: 330000,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'UNPAID',
      status: 'PENDING',
      date: '2026-10-08 11:45 AM',
      deliveryAddress: 'Dhanmondi 8/A, House 19, Dhaka',
    },
    {
      id: 'SW-98237',
      customerName: 'Nadia Sharmin',
      phone: '+880 1744-556677',
      email: 'nadia.sharmin@outlook.com',
      items: [
        {
          name: 'Sitara Celestial Diamond Pendant',
          quantity: 1,
          price: 78000,
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
        },
      ],
      totalAmount: 78000,
      paymentMethod: 'Nagad',
      paymentStatus: 'PAID',
      status: 'DELIVERED',
      date: '2026-10-05 09:10 AM',
      deliveryAddress: 'Mirpur DOHS, Road 4, Dhaka',
    },
  ]);

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<AdminOrder | null>(null);

  // Employees & Payroll State
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 'EMP-01',
      name: 'Haripada Karmakar',
      role: 'Master Goldsmith & Head Artisan',
      department: 'Workshop',
      phone: '+880 1711-203040',
      email: 'haripada.gold@swornali.com',
      joinDate: '2020-03-15',
      baseSalary: 65000,
      bonus: 12000,
      payrollStatus: 'PAID',
      lastPaidDate: '2026-10-01',
      nid: '198426149200031',
    },
    {
      id: 'EMP-02',
      name: 'Dulal Chandra Sen',
      role: 'Senior Polki & Filigree Specialist',
      department: 'Workshop',
      phone: '+880 1812-334455',
      email: 'dulal.sen@swornali.com',
      joinDate: '2021-06-01',
      baseSalary: 52000,
      bonus: 8500,
      payrollStatus: 'PAID',
      lastPaidDate: '2026-10-01',
      nid: '198826149200088',
    },
    {
      id: 'EMP-03',
      name: 'Tanvir Ahmed',
      role: 'Gemologist & Quality Hallmarker',
      department: 'Design & QC',
      phone: '+880 1914-778899',
      email: 'tanvir.qc@swornali.com',
      joinDate: '2022-01-10',
      baseSalary: 45000,
      bonus: 5000,
      payrollStatus: 'PENDING',
      nid: '199226149200055',
    },
    {
      id: 'EMP-04',
      name: 'Nusrat Jahan Mim',
      role: 'Showroom & VIP Client Manager',
      department: 'Showroom',
      phone: '+880 1618-223311',
      email: 'nusrat.sales@swornali.com',
      joinDate: '2022-09-01',
      baseSalary: 40000,
      bonus: 15000,
      payrollStatus: 'PAID',
      lastPaidDate: '2026-10-01',
      nid: '199526149200012',
    },
    {
      id: 'EMP-05',
      name: 'Abul Kashem',
      role: 'Senior Vault & Asset Security Officer',
      department: 'Showroom',
      phone: '+880 1720-998811',
      email: 'kashem.sec@swornali.com',
      joinDate: '2020-04-10',
      baseSalary: 32000,
      bonus: 3000,
      payrollStatus: 'PENDING',
      nid: '197926149200099',
    },
  ]);

  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    name: '',
    role: '',
    department: 'Workshop',
    phone: '',
    email: '',
    joinDate: new Date().toISOString().split('T')[0],
    baseSalary: 35000,
    bonus: 0,
    payrollStatus: 'PENDING',
    nid: '',
  });

  // Custom Bespoke Requests State
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([
    {
      id: 'REQ-109',
      customerName: 'Samira Huq',
      phone: '+880 1718-990011',
      type: 'Bespoke Bridal 5-Piece Kundan Set',
      budget: '৳8,50,000 - ৳10,00,000',
      metal: '22K Gold with Zambian Emeralds',
      deadline: '2026-11-20',
      status: 'Designing',
      notes: 'Customer provided heritage family sketch. Wants 3D CAD render by Monday.',
    },
    {
      id: 'REQ-108',
      customerName: 'Mahmudur Rahman',
      phone: '+880 1912-334411',
      type: 'Platinum & Solitaire Wedding Bands',
      budget: '৳3,50,000',
      metal: '950 Platinum & VVS1 Diamonds',
      deadline: '2026-10-25',
      status: 'Crafting',
      notes: 'Inner ring engraving: "Forever M&S 2026". Assigned to Master Haripada.',
    },
  ]);

  // Notifications / Alert toast
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3500);
  };

  // Actions for Orders
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} updated to ${newStatus}`);
  };

  // Actions for Gold Rates
  const handleSaveGoldRates = () => {
    setGoldRates(tempRates);
    setRateEditModalOpen(false);
    showToast('Market gold rates updated! Product baseline prices recalculated.');
  };

  // Actions for Products
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('Image file too large (maximum 10MB allowed)');
        return;
      }
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        setNewProduct((prev) => ({ ...prev, image: base64Url }));
        setUploadedImagePreview(base64Url);
        showToast(`Image "${file.name}" uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name) return;
    const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalImage = newProduct.image || uploadedImagePreview || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80';
    const productToAdd: Product = {
      id: `p-${Date.now()}`,
      slug,
      name: newProduct.name,
      category: newProduct.category,
      collection: 'Royal Heritage',
      price: Number(newProduct.price),
      material: newProduct.material,
      purity: newProduct.purity,
      weightGrams: Number(newProduct.weightGrams),
      stone: newProduct.stone,
      rating: 5.0,
      reviews: 1,
      images: [finalImage],
      sizes: ['Standard', 'Custom'],
      longDescription: newProduct.description || 'Handcrafted luxury jewelry from Dhaka.',
      description: newProduct.description || 'Exquisite fine jewelry piece handcrafted by Swornali Jewellers.',
      image: finalImage,
      stock: Number(newProduct.stock),
      badge: newProduct.badge,
    };

    setProductList([productToAdd, ...productList]);
    setIsAddProductOpen(false);
    showToast(`New product "${productToAdd.name}" added to catalog!`);
    setUploadedImagePreview(null);
    setUploadedFileName('');
    setShowUrlFallback(false);
    setNewProduct({
      name: '',
      category: 'Rings',
      price: 95000,
      material: '22K Gold',
      purity: '22K',
      weightGrams: 8.5,
      stone: 'None',
      description: '',
      image: '',
      stock: 5,
      badge: 'New Arrival',
    });
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from store inventory?`)) {
      setProductList(productList.filter((p) => p.id !== id));
      showToast(`Product "${name}" removed from catalog.`);
    }
  };

  // Actions for Employees
  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.role) return;
    const empToAdd: Employee = {
      ...newEmployee,
      id: `EMP-0${employees.length + 1}`,
      baseSalary: Number(newEmployee.baseSalary),
      bonus: Number(newEmployee.bonus),
    };
    setEmployees([...employees, empToAdd]);
    setIsAddEmployeeOpen(false);
    showToast(`Staff member "${empToAdd.name}" registered successfully!`);
    setNewEmployee({
      name: '',
      role: '',
      department: 'Workshop',
      phone: '',
      email: '',
      joinDate: new Date().toISOString().split('T')[0],
      baseSalary: 35000,
      bonus: 0,
      payrollStatus: 'PENDING',
      nid: '',
    });
  };

  const handlePaySalary = (empId: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === empId
          ? {
              ...emp,
              payrollStatus: 'PAID',
              lastPaidDate: new Date().toISOString().split('T')[0],
            }
          : emp
      )
    );
    showToast(`Salary disbursed and recorded for employee ${empId}`);
  };

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'PAID' ? o.totalAmount : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const totalPayrollExpense = employees.reduce((sum, e) => sum + e.baseSalary + e.bonus, 0);
  const paidPayrollAmount = employees
    .filter((e) => e.payrollStatus === 'PAID')
    .reduce((sum, e) => sum + e.baseSalary + e.bonus, 0);
  const totalGoldVaultWeight = productList.reduce((sum, p) => sum + (p.weightGrams ? p.weightGrams * (p.stock || 1) : 0), 0);

  // Filtered views
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'ALL' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = productList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.material.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-root min-h-screen bg-[#070707] text-[#e0e0e0] font-sans antialiased flex flex-col md:flex-row">
      {/* Toast Notification */}
      {adminToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#151515] border border-[#c9a96e] text-[#f7e7ce] px-5 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-fade-in">
          <Sparkles size={18} className="text-[#c9a96e]" />
          <span className="text-sm font-medium">{adminToast}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          ADMIN SIDEBAR NAVIGATION
          ═══════════════════════════════════════════════ */}
      <aside className="w-full md:w-64 bg-[#0e0e0e] border-b md:border-b-0 md:border-r border-[#222] flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-[#1c1c1c]">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c9a96e] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-semibold">Owner Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <img
              src="/Swornali-Jewellers/images/logo.png"
              alt="স্বর্ণালী জুয়েলার্স"
              className="w-12 h-12 object-contain drop-shadow-[0_2px_10px_rgba(201,169,110,0.35)] flex-shrink-0"
            />
            <div>
              <h1 className="font-display text-xl tracking-wider text-[#f5f5f5] font-bold leading-tight">
                স্বর্ণালী জুয়েলার্স
              </h1>
              <span className="block text-[9px] tracking-[0.25em] font-sans text-[#a0a0a0] uppercase font-semibold">SWORNALI JEWELLERS</span>
            </div>
          </div>
          <div className="mt-2 text-xs font-semibold text-[#c9a96e]">
            রাম প্রসাদ তরফদার <span className="text-[10px] text-[#888] font-normal">(প্রোপাইটার)</span>
          </div>
          <div className="text-[11px] text-[#888] mt-1 leading-snug">
            📍 মেহেদী মার্কেট, রাজগঞ্জ রোড, যশোর
          </div>
          <div className="text-[11px] text-[#c9a96e] mt-1">
            📞 01818-341601 / 01990-544288
          </div>
        </div>

        {/* Live Gold Ticker Widget in Sidebar */}
        <div className="p-4 mx-4 my-3 bg-[#141414] border border-[#262626] rounded-md">
          <div className="flex items-center justify-between text-xs text-[#a0a0a0] mb-1.5">
            <span className="flex items-center gap-1 text-[#c9a96e] font-medium">
              <Scale size={13} /> Live Hallmark Rate
            </span>
            <button
              onClick={() => {
                setTempRates(goldRates);
                setRateEditModalOpen(true);
              }}
              className="text-[10px] text-[#c9a96e] hover:underline"
            >
              Update
            </button>
          </div>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-[#888]">22K Standard:</span>
              <span className="font-medium text-[#e5e5e5]">{formatPrice(goldRates['22K'])}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">21K Guinea:</span>
              <span className="font-medium text-[#c9a96e]">{formatPrice(goldRates['21K'] || 9850)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">18K Hallmark:</span>
              <span className="font-medium text-[#e5e5e5]">{formatPrice(goldRates['18K'])}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">24K Fine Gold:</span>
              <span className="font-medium text-[#e5e5e5]">{formatPrice(goldRates['24K'])}</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#c9a96e] text-[#0a0a0a] font-semibold shadow-md'
                : 'text-[#aaa] hover:bg-[#161616] hover:text-[#fff]'
            }`}
          >
            <TrendingUp size={18} /> Executive Overview
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-[#c9a96e] text-[#0a0a0a] font-semibold shadow-md'
                : 'text-[#aaa] hover:bg-[#161616] hover:text-[#fff]'
            }`}
          >
            <span className="flex items-center gap-3">
              <Package size={18} /> Orders & Workshop
            </span>
            {pendingOrdersCount > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'orders' ? 'bg-[#0a0a0a] text-[#c9a96e]' : 'bg-[#c9a96e] text-[#0a0a0a]'}`}>
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-[#c9a96e] text-[#0a0a0a] font-semibold shadow-md'
                : 'text-[#aaa] hover:bg-[#161616] hover:text-[#fff]'
            }`}
          >
            <Sparkles size={18} /> Product Inventory
          </button>

          <button
            onClick={() => setActiveTab('employees')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'employees'
                ? 'bg-[#c9a96e] text-[#0a0a0a] font-semibold shadow-md'
                : 'text-[#aaa] hover:bg-[#161616] hover:text-[#fff]'
            }`}
          >
            <Users size={18} /> Staff & Payroll
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'custom'
                ? 'bg-[#c9a96e] text-[#0a0a0a] font-semibold shadow-md'
                : 'text-[#aaa] hover:bg-[#161616] hover:text-[#fff]'
            }`}
          >
            <span className="flex items-center gap-3">
              <CreditCard size={18} /> Bespoke Bridal
            </span>
            <span className="text-[10px] bg-[#222] text-[#c9a96e] px-2 py-0.5 rounded">2 New</span>
          </button>
        </nav>

        {/* Storefront return */}
        <div className="p-4 border-t border-[#1c1c1c]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-4 py-2 text-xs text-[#888] hover:text-[#c9a96e] hover:bg-[#141414] rounded transition-colors"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={14} /> View Live Storefront
            </span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════
          MAIN CONTENT AREA
          ═══════════════════════════════════════════════ */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 border-b border-[#1f1f1f]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#888] uppercase tracking-wider">
              <span>Swornali Executive</span>
              <ChevronRight size={12} />
              <span className="text-[#c9a96e] font-medium capitalize">{activeTab}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#f5f5f5] mt-1">
              {activeTab === 'overview' && 'Executive Business Cockpit'}
              {activeTab === 'orders' && 'Order Processing & Workshop Pipeline'}
              {activeTab === 'products' && 'Luxury Jewelry Inventory & Catalog'}
              {activeTab === 'employees' && 'Artisans, Staff & Payroll Management'}
              {activeTab === 'custom' && 'Bespoke Jewelry Commissions'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-[#112215] text-[#4ade80] border border-[#1b3d22] px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
              <ShieldCheck size={14} /> Vault Secured (24/7 Monitored)
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            TAB 1: EXECUTIVE OVERVIEW
            ═══════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#111111] border border-[#222] p-5 rounded-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Verified Revenue</span>
                  <div className="p-2 bg-[#1c1810] text-[#c9a96e] rounded-md">
                    <TrendingUp size={18} />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold font-display text-[#f5f5f5]">{formatPrice(totalRevenue)}</span>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#4ade80]">
                    <ArrowUpRight size={14} />
                    <span>+18.4% this month</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111111] border border-[#222] p-5 rounded-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Workshop Pipeline</span>
                  <div className="p-2 bg-[#121c17] text-[#4ade80] rounded-md">
                    <Package size={18} />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold font-display text-[#f5f5f5]">{pendingOrdersCount} Active</span>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#888]">
                    <span>Across Crafting, QC & Courier</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111111] border border-[#222] p-5 rounded-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Vault Gold Stock</span>
                  <div className="p-2 bg-[#1c1810] text-[#c9a96e] rounded-md">
                    <Scale size={18} />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold font-display text-[#f5f5f5]">{totalGoldVaultWeight.toFixed(1)} g</span>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#c9a96e]">
                    <span>Est. {formatPrice(totalGoldVaultWeight * goldRates['22K'])}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111111] border border-[#222] p-5 rounded-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Active Staff & Artisans</span>
                  <div className="p-2 bg-[#161616] text-[#e0e0e0] rounded-md">
                    <Users size={18} />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold font-display text-[#f5f5f5]">{employees.length} Staff</span>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#888]">
                    <span>Monthly Payroll: {formatPrice(totalPayrollExpense)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Urgent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders Overview */}
              <div className="lg:col-span-2 bg-[#111111] border border-[#222] rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-lg font-bold text-[#f5f5f5]">Recent Customer Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#c9a96e] hover:underline flex items-center gap-1"
                  >
                    View All Orders <ChevronRight size={14} />
                  </button>
                </div>

                <div className="divide-y divide-[#1e1e1e]">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#c9a96e]">{order.id}</span>
                          <span className="text-sm font-medium text-[#f5f5f5]">{order.customerName}</span>
                        </div>
                        <p className="text-xs text-[#777] mt-0.5">
                          {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-[#e5e5e5]">{formatPrice(order.totalAmount)}</span>
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded font-semibold uppercase ${
                            order.status === 'DELIVERED'
                              ? 'bg-[#13281a] text-[#4ade80]'
                              : order.status === 'CRAFTING'
                              ? 'bg-[#291e0d] text-[#f59e0b]'
                              : order.status === 'SHIPPED'
                              ? 'bg-[#112338] text-[#60a5fa]'
                              : 'bg-[#222] text-[#aaa]'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast Workshop Controls */}
              <div className="bg-[#111111] border border-[#222] rounded-lg p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#f5f5f5] mb-4">Storefront Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setTempRates(goldRates);
                        setRateEditModalOpen(true);
                      }}
                      className="w-full bg-[#181818] hover:bg-[#202020] border border-[#2e2e2e] text-left p-3.5 rounded-md flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Scale size={18} className="text-[#c9a96e]" />
                        <div>
                          <div className="text-xs font-semibold text-[#f5f5f5]">Adjust Daily Gold Rates</div>
                          <div className="text-[11px] text-[#777]">Sync with BAJUS market prices</div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-[#666]" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('products');
                        setIsAddProductOpen(true);
                      }}
                      className="w-full bg-[#181818] hover:bg-[#202020] border border-[#2e2e2e] text-left p-3.5 rounded-md flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Plus size={18} className="text-[#c9a96e]" />
                        <div>
                          <div className="text-xs font-semibold text-[#f5f5f5]">Add New Jewelry Product</div>
                          <div className="text-[11px] text-[#777]">Upload photo, karat, weight & price</div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-[#666]" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('employees');
                        setIsAddEmployeeOpen(true);
                      }}
                      className="w-full bg-[#181818] hover:bg-[#202020] border border-[#2e2e2e] text-left p-3.5 rounded-md flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Users size={18} className="text-[#c9a96e]" />
                        <div>
                          <div className="text-xs font-semibold text-[#f5f5f5]">Register New Employee</div>
                          <div className="text-[11px] text-[#777]">Add artisan or showroom executive</div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-[#666]" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#1e1e1e]">
                  <div className="flex justify-between items-center text-xs text-[#888]">
                    <span>Pending Staff Salaries:</span>
                    <span className="font-semibold text-[#f59e0b]">
                      {formatPrice(totalPayrollExpense - paidPayrollAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            TAB 2: ORDER MANAGEMENT & WORKSHOP
            ═══════════════════════════════════════════════ */}
        {activeTab === 'orders' && (
          <div className="mt-8 space-y-6">
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-[#111111] p-4 rounded-lg border border-[#222]">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777]" />
                <input
                  type="text"
                  placeholder="Search by Order ID (SW-...), Customer name or phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2b2b2b] rounded-md pl-10 pr-4 py-2 text-sm text-[#f5f5f5] placeholder-[#666] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {['ALL', 'PENDING', 'CONFIRMED', 'CRAFTING', 'QUALITY_CHECK', 'SHIPPED', 'DELIVERED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                      orderStatusFilter === st
                        ? 'bg-[#c9a96e] text-[#0a0a0a] font-bold'
                        : 'bg-[#1a1a1a] text-[#888] hover:text-[#fff]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#111111] border border-[#222] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#161616] text-[#888] text-xs uppercase tracking-wider border-b border-[#222]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Order ID</th>
                      <th className="py-3.5 px-4 font-semibold">Customer Details</th>
                      <th className="py-3.5 px-4 font-semibold">Items</th>
                      <th className="py-3.5 px-4 font-semibold">Total Amount</th>
                      <th className="py-3.5 px-4 font-semibold">Payment</th>
                      <th className="py-3.5 px-4 font-semibold">Status / Workflow</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c1c]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-[#777]">
                          No orders found matching the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#151515] transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-[#c9a96e] text-xs">
                            {order.id}
                            <div className="text-[10px] text-[#666] font-sans font-normal mt-0.5">{order.date}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-[#f5f5f5]">{order.customerName}</div>
                            <div className="text-xs text-[#888]">{order.phone}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-xs text-[#ccc]">
                              {order.items.map((i, idx) => (
                                <div key={idx}>
                                  {i.name} <span className="text-[#888]">x{i.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-[#f5f5f5]">
                            {formatPrice(order.totalAmount)}
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-xs text-[#ddd]">{order.paymentMethod}</div>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                order.paymentStatus === 'PAID'
                                  ? 'bg-[#13281a] text-[#4ade80]'
                                  : 'bg-[#291e0d] text-[#f59e0b]'
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                              className="bg-[#1a1a1a] border border-[#333] text-xs text-[#f5f5f5] rounded px-2.5 py-1.5 focus:border-[#c9a96e] focus:outline-none"
                            >
                              <option value="PENDING">PENDING (Reviewing)</option>
                              <option value="CONFIRMED">CONFIRMED (Accepted)</option>
                              <option value="CRAFTING">CRAFTING (In Workshop)</option>
                              <option value="QUALITY_CHECK">QUALITY CHECK (Hallmark)</option>
                              <option value="SHIPPED">SHIPPED (Insured Courier)</option>
                              <option value="DELIVERED">DELIVERED (Completed)</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                            {order.assignedArtisan && (
                              <div className="text-[10px] text-[#888] mt-1">By: {order.assignedArtisan}</div>
                            )}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrderDetails(order)}
                              className="p-1.5 hover:bg-[#222] rounded text-[#c9a96e] hover:text-[#fff] transition-colors"
                              title="View Invoice & Details"
                            >
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            TAB 3: PRODUCTS INVENTORY & UPDATE
            ═══════════════════════════════════════════════ */}
        {activeTab === 'products' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#111111] p-4 rounded-lg border border-[#222]">
              <div className="flex flex-1 gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777]" />
                  <input
                    type="text"
                    placeholder="Search products by title, metal, purity..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-md pl-10 pr-4 py-2 text-sm text-[#f5f5f5] placeholder-[#666] focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="bg-[#181818] border border-[#2b2b2b] rounded-md px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                >
                  <option value="All">All Categories</option>
                  <option value="Rings">Rings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Bracelets">Bracelets</option>
                  <option value="Bridal">Bridal</option>
                </select>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#c9a96e] hover:bg-[#d8bc85] text-[#0a0a0a] px-4 py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={16} /> Add New Jewelry
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-[#111111] border border-[#222] rounded-lg overflow-hidden flex flex-col group hover:border-[#383838] transition-colors">
                  <div className="relative h-48 bg-[#181818] overflow-hidden">
                    <Image
                      src={product.image || 'https://images.unsplash.com/photo-1599643478524-fb66f70a00bf?w=800&q=80'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#0a0a0a]/80 backdrop-blur-sm text-[#c9a96e] text-[10px] font-bold uppercase px-2 py-1 rounded">
                      {product.category}
                    </div>
                    {product.badge && (
                      <div className="absolute top-2 right-2 bg-[#c9a96e] text-[#0a0a0a] text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-semibold text-[#f5f5f5] text-base line-clamp-1">{product.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-[#888] mt-1.5">
                        <span>{product.material}</span>
                        <span>•</span>
                        <span>{product.weightGrams ? `${product.weightGrams}g` : 'N/A'}</span>
                        <span>•</span>
                        <span>Stone: {product.stone || 'None'}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1e1e1e] flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[#777]">Retail Price</div>
                        <div className="text-base font-bold text-[#c9a96e]">{formatPrice(product.price)}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-xs text-right mr-2">
                          <span className="block text-[#777]">Stock</span>
                          <span className={`font-bold ${product.stock > 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                            {product.stock} pcs
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="p-1.5 text-[#777] hover:text-[#f87171] hover:bg-[#1e1e1e] rounded transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            TAB 4: EMPLOYEES & PAYROLL MANAGEMENT
            ═══════════════════════════════════════════════ */}
        {activeTab === 'employees' && (
          <div className="mt-8 space-y-6">
            {/* Payroll Summary Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-[#111111] border border-[#222] p-5 rounded-lg">
                <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Total Monthly Payroll</span>
                <div className="text-2xl font-bold font-display text-[#f5f5f5] mt-2">
                  {formatPrice(totalPayrollExpense)}
                </div>
                <div className="text-xs text-[#777] mt-1">{employees.length} Registered Staff Members</div>
              </div>

              <div className="bg-[#111111] border border-[#222] p-5 rounded-lg">
                <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Disbursed This Month</span>
                <div className="text-2xl font-bold font-display text-[#4ade80] mt-2">
                  {formatPrice(paidPayrollAmount)}
                </div>
                <div className="text-xs text-[#4ade80] mt-1">
                  {employees.filter((e) => e.payrollStatus === 'PAID').length} Staff Paid
                </div>
              </div>

              <div className="bg-[#111111] border border-[#222] p-5 rounded-lg">
                <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Pending Disbursement</span>
                <div className="text-2xl font-bold font-display text-[#f59e0b] mt-2">
                  {formatPrice(totalPayrollExpense - paidPayrollAmount)}
                </div>
                <div className="text-xs text-[#f59e0b] mt-1">
                  {employees.filter((e) => e.payrollStatus !== 'PAID').length} Staff Awaiting Salary
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex justify-between items-center bg-[#111111] p-4 rounded-lg border border-[#222]">
              <div>
                <h3 className="font-display font-semibold text-lg text-[#f5f5f5]">Artisans & Showroom Staff Directory</h3>
                <p className="text-xs text-[#777]">Manage goldsmiths, gemologists, sales staff & monthly salaries</p>
              </div>

              <button
                onClick={() => setIsAddEmployeeOpen(true)}
                className="bg-[#c9a96e] hover:bg-[#d8bc85] text-[#0a0a0a] px-4 py-2 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                <Plus size={16} /> Register Employee
              </button>
            </div>

            {/* Employee Table */}
            <div className="bg-[#111111] border border-[#222] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#161616] text-[#888] text-xs uppercase tracking-wider border-b border-[#222]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Staff ID & Name</th>
                      <th className="py-3.5 px-4 font-semibold">Designation & Dept</th>
                      <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                      <th className="py-3.5 px-4 font-semibold">Base Salary</th>
                      <th className="py-3.5 px-4 font-semibold">Bonus / Crafting Comm.</th>
                      <th className="py-3.5 px-4 font-semibold">Payroll Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c1c]">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-[#151515] transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-mono text-xs text-[#c9a96e]">{emp.id}</div>
                          <div className="font-semibold text-[#f5f5f5] text-sm">{emp.name}</div>
                          <div className="text-[10px] text-[#666]">Joined: {emp.joinDate}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-[#e0e0e0]">{emp.role}</div>
                          <span className="text-[10px] bg-[#1d1d1d] text-[#c9a96e] px-2 py-0.5 rounded font-medium">
                            {emp.department}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-xs text-[#aaa]">
                          <div>{emp.phone}</div>
                          <div className="text-[#666]">{emp.email}</div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-[#f5f5f5]">
                          {formatPrice(emp.baseSalary)}
                        </td>
                        <td className="py-4 px-4 text-[#4ade80] font-medium">
                          {emp.bonus > 0 ? `+${formatPrice(emp.bonus)}` : '৳0'}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-xs px-2.5 py-1 rounded font-bold uppercase inline-flex items-center gap-1 ${
                              emp.payrollStatus === 'PAID'
                                ? 'bg-[#13281a] text-[#4ade80]'
                                : 'bg-[#291e0d] text-[#f59e0b]'
                            }`}
                          >
                            {emp.payrollStatus === 'PAID' ? <Check size={12} /> : <Clock size={12} />}
                            {emp.payrollStatus}
                          </span>
                          {emp.lastPaidDate && (
                            <div className="text-[10px] text-[#666] mt-0.5">Paid: {emp.lastPaidDate}</div>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          {emp.payrollStatus !== 'PAID' ? (
                            <button
                              onClick={() => handlePaySalary(emp.id)}
                              className="bg-[#241a0d] hover:bg-[#c9a96e] text-[#c9a96e] hover:text-[#0a0a0a] border border-[#c9a96e] px-3 py-1 rounded text-xs font-semibold transition-colors"
                            >
                              Disburse ৳{emp.baseSalary + emp.bonus}
                            </button>
                          ) : (
                            <span className="text-xs text-[#666] italic">Cleared</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            TAB 5: BESPOKE CUSTOM REQUESTS
            ═══════════════════════════════════════════════ */}
        {activeTab === 'custom' && (
          <div className="mt-8 space-y-6">
            <div className="bg-[#111111] p-5 rounded-lg border border-[#222]">
              <h3 className="font-display font-semibold text-lg text-[#f5f5f5]">VIP Bespoke Jewelry Intake</h3>
              <p className="text-xs text-[#777]">Custom heirloom orders submitted by customers through the custom jewellery studio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customRequests.map((req) => (
                <div key={req.id} className="bg-[#111111] border border-[#222] rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-mono text-xs text-[#c9a96e] font-bold">{req.id}</span>
                      <span className="text-xs bg-[#222] text-[#c9a96e] px-2 py-0.5 rounded font-semibold uppercase">
                        {req.status}
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-[#f5f5f5]">{req.type}</h4>
                    <div className="mt-2 text-xs text-[#aaa] space-y-1">
                      <div><strong className="text-[#888]">Client:</strong> {req.customerName} ({req.phone})</div>
                      <div><strong className="text-[#888]">Metal & Stones:</strong> {req.metal}</div>
                      <div><strong className="text-[#888]">Estimated Budget:</strong> {req.budget}</div>
                      <div><strong className="text-[#888]">Required By:</strong> {req.deadline}</div>
                    </div>

                    <div className="mt-4 p-3 bg-[#161616] rounded border border-[#262626] text-xs text-[#bbb]">
                      <span className="font-semibold text-[#888] block mb-1">Owner Notes:</span>
                      {req.notes}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1e1e1e] flex justify-end gap-3">
                    <button
                      onClick={() => showToast(`Opening communications channel with ${req.customerName}`)}
                      className="px-3 py-1.5 bg-[#181818] hover:bg-[#222] text-xs font-semibold text-[#e0e0e0] rounded border border-[#333] transition-colors"
                    >
                      Contact Client
                    </button>
                    <button
                      onClick={() => showToast(`Design approved for ${req.id} - Handed to Master Goldsmith`)}
                      className="px-3 py-1.5 bg-[#c9a96e] hover:bg-[#d8bc85] text-xs font-semibold text-[#0a0a0a] rounded transition-colors"
                    >
                      Assign Goldsmith
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ═══════════════════════════════════════════════
          MODAL 1: UPDATE GOLD RATES
          ═══════════════════════════════════════════════ */}
      {rateEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#c9a96e]/40 rounded-lg max-w-md w-full p-6 animate-scale-in">
            <div className="flex justify-between items-center pb-4 border-b border-[#222]">
              <div className="flex items-center gap-2">
                <Scale size={20} className="text-[#c9a96e]" />
                <h3 className="font-display font-bold text-lg text-[#f5f5f5]">Update Live Gold Market Rates</h3>
              </div>
              <button onClick={() => setRateEditModalOpen(false)} className="text-[#888] hover:text-[#fff]">
                <X size={18} />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <label htmlFor="gold-rate-24k" className="block text-xs text-[#888] uppercase tracking-wider mb-1">24K Fine Gold (BDT per gram)</label>
                <input
                  id="gold-rate-24k"
                  type="number"
                  value={tempRates['24K']}
                  onChange={(e) => setTempRates({ ...tempRates, '24K': Number(e.target.value) })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>

              <div>
                <label htmlFor="gold-rate-22k" className="block text-xs text-[#888] uppercase tracking-wider mb-1">22K Standard Gold (BDT per gram)</label>
                <input
                  id="gold-rate-22k"
                  type="number"
                  value={tempRates['22K']}
                  onChange={(e) => setTempRates({ ...tempRates, '22K': Number(e.target.value) })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>

              <div>
                <label htmlFor="gold-rate-18k" className="block text-xs text-[#888] uppercase tracking-wider mb-1">18K Jewelry Gold (BDT per gram)</label>
                <input
                  id="gold-rate-18k"
                  type="number"
                  value={tempRates['18K']}
                  onChange={(e) => setTempRates({ ...tempRates, '18K': Number(e.target.value) })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#222] flex justify-end gap-3">
              <button
                onClick={() => setRateEditModalOpen(false)}
                className="px-4 py-2 bg-[#222] hover:bg-[#2a2a2a] text-xs font-semibold text-[#ccc] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGoldRates}
                className="px-4 py-2 bg-[#c9a96e] hover:bg-[#d8bc85] text-xs font-bold text-[#0a0a0a] rounded transition-colors"
              >
                Apply Rates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          MODAL 2: ADD PRODUCT
          ═══════════════════════════════════════════════ */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333] rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#222]">
              <h3 className="font-display font-bold text-lg text-[#f5f5f5]">Add New Luxury Jewelry Piece</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-[#888] hover:text-[#fff]">
                <X size={18} />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <label htmlFor="new-product-name" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Product Title</label>
                <input
                  id="new-product-name"
                  type="text"
                  placeholder="e.g. Rajkonna Heritage Polki Necklace"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="new-product-category" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Category</label>
                  <select
                    id="new-product-category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as Category })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                  >
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelets">Bracelets</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="new-product-purity" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Gold Karat</label>
                  <select
                    id="new-product-purity"
                    value={newProduct.purity}
                    onChange={(e) => setNewProduct({ ...newProduct, purity: e.target.value, material: `${e.target.value} Gold` })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                  >
                    <option value="24K">24K Fine Gold</option>
                    <option value="22K">22K Standard Gold</option>
                    <option value="18K">18K Rose/White Gold</option>
                    <option value="Platinum">Platinum 950</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="new-product-price" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Selling Price (৳)</label>
                  <input
                    id="new-product-price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>

                <div>
                  <label htmlFor="new-product-weight" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Weight in Grams</label>
                  <input
                    id="new-product-weight"
                    type="number"
                    step="0.1"
                    value={newProduct.weightGrams}
                    onChange={(e) => setNewProduct({ ...newProduct, weightGrams: Number(e.target.value) })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="new-product-stock" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Available Quantity / Stock</label>
                  <input
                    id="new-product-stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>

                <div>
                  <label htmlFor="new-product-stone" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Stone Details</label>
                  <input
                    id="new-product-stone"
                    type="text"
                    placeholder="e.g. VVS1 Diamond / Colombian Emerald"
                    value={newProduct.stone}
                    onChange={(e) => setNewProduct({ ...newProduct, stone: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-2">Upload Product Images</label>
                
                {uploadedImagePreview || newProduct.image ? (
                  <div className="relative border border-[#333] rounded-lg p-3 bg-[#161616] flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#222] border border-[#444] flex-shrink-0">
                      <img
                        src={uploadedImagePreview || newProduct.image}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#f5f5f5] truncate">
                        {uploadedFileName || 'Selected Product Image'}
                      </div>
                      <div className="text-[11px] text-[#4ade80] flex items-center gap-1 mt-0.5">
                        <CheckCircle2 size={12} /> Ready for publishing
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <label
                          htmlFor="product-file-upload"
                          className="cursor-pointer text-[11px] font-semibold text-[#c9a96e] hover:underline flex items-center gap-1"
                        >
                          <Upload size={12} /> Change photo
                        </label>
                        <span className="text-[#555]">|</span>
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedImagePreview(null);
                            setUploadedFileName('');
                            setNewProduct((prev) => ({ ...prev, image: '' }));
                          }}
                          className="text-[11px] text-[#f87171] hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="product-file-upload"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        setUploadedFileName(file.name);
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const base64Url = event.target?.result as string;
                          setNewProduct((prev) => ({ ...prev, image: base64Url }));
                          setUploadedImagePreview(base64Url);
                          showToast(`Image "${file.name}" uploaded!`);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="border-2 border-dashed border-[#333] hover:border-[#c9a96e] rounded-lg p-6 bg-[#161616] hover:bg-[#1a1a1a] transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#202020] group-hover:bg-[#282216] flex items-center justify-center text-[#c9a96e] mb-3 transition-colors">
                      <Upload size={22} />
                    </div>
                    <span className="text-sm font-semibold text-[#f5f5f5]">
                      Click to upload or drag & drop image
                    </span>
                    <span className="text-xs text-[#777] mt-1">
                      High-resolution PNG, JPG, WEBP (Up to 10MB)
                    </span>
                  </label>
                )}

                <input
                  id="product-file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setShowUrlFallback(!showUrlFallback)}
                    className="text-[11px] text-[#777] hover:text-[#c9a96e] underline"
                  >
                    {showUrlFallback ? 'Hide URL input' : 'Or paste image link instead'}
                  </button>
                </div>

                {showUrlFallback && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="https://..."
                      value={newProduct.image}
                      onChange={(e) => {
                        setNewProduct({ ...newProduct, image: e.target.value });
                        setUploadedImagePreview(e.target.value);
                      }}
                      className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-xs text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="new-product-desc" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Artisan Description</label>
                <textarea
                  id="new-product-desc"
                  rows={2}
                  placeholder="Intricate craftsmanship details, hallmark purity..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#222] flex justify-end gap-3">
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="px-4 py-2 bg-[#222] hover:bg-[#2a2a2a] text-xs font-semibold text-[#ccc] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-[#c9a96e] hover:bg-[#d8bc85] text-xs font-bold text-[#0a0a0a] rounded transition-colors"
              >
                Publish Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          MODAL 3: REGISTER EMPLOYEE
          ═══════════════════════════════════════════════ */}
      {isAddEmployeeOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333] rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#222]">
              <h3 className="font-display font-bold text-lg text-[#f5f5f5]">Register New Staff Member</h3>
              <button onClick={() => setIsAddEmployeeOpen(false)} className="text-[#888] hover:text-[#fff]">
                <X size={18} />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <label htmlFor="new-emp-name" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Full Legal Name</label>
                <input
                  id="new-emp-name"
                  type="text"
                  placeholder="e.g. Bijoy Karmakar"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>

              <div>
                <label htmlFor="new-emp-role" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Role / Designation</label>
                <input
                  id="new-emp-role"
                  type="text"
                  placeholder="e.g. Master Goldsmith / Stone Setter"
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="new-emp-dept" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Department</label>
                  <select
                    id="new-emp-dept"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value as any })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Showroom">Showroom</option>
                    <option value="Design & QC">Design & QC</option>
                    <option value="Accounts">Accounts</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="new-emp-salary" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Base Salary (৳)</label>
                  <input
                    id="new-emp-salary"
                    type="number"
                    value={newEmployee.baseSalary}
                    onChange={(e) => setNewEmployee({ ...newEmployee, baseSalary: Number(e.target.value) })}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="new-emp-phone" className="block text-xs text-[#888] uppercase tracking-wider mb-1">Mobile Contact</label>
                <input
                  id="new-emp-phone"
                  type="text"
                  placeholder="+880 17..."
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#222] flex justify-end gap-3">
              <button
                onClick={() => setIsAddEmployeeOpen(false)}
                className="px-4 py-2 bg-[#222] hover:bg-[#2a2a2a] text-xs font-semibold text-[#ccc] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                className="px-4 py-2 bg-[#c9a96e] hover:bg-[#d8bc85] text-xs font-bold text-[#0a0a0a] rounded transition-colors"
              >
                Save Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          MODAL 4: INVOICE / ORDER DETAIL
          ═══════════════════════════════════════════════ */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333] rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#222]">
              <div>
                <span className="text-xs font-mono text-[#c9a96e]">{selectedOrderDetails.id}</span>
                <h3 className="font-display font-bold text-lg text-[#f5f5f5]">Official Order Slip & Invoice</h3>
              </div>
              <button onClick={() => setSelectedOrderDetails(null)} className="text-[#888] hover:text-[#fff]">
                <X size={18} />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="bg-[#181818] p-4 rounded border border-[#262626] text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#777]">Customer:</span>
                  <span className="font-semibold text-[#f5f5f5]">{selectedOrderDetails.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Contact:</span>
                  <span className="text-[#ddd]">{selectedOrderDetails.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Delivery Address:</span>
                  <span className="text-[#ddd] text-right max-w-xs">{selectedOrderDetails.deliveryAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Payment:</span>
                  <span className="text-[#4ade80] font-semibold">{selectedOrderDetails.paymentMethod} ({selectedOrderDetails.paymentStatus})</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">Itemized Jewelry</h4>
                <div className="space-y-2">
                  {selectedOrderDetails.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#161616] p-3 rounded border border-[#222]">
                      <div>
                        <div className="text-sm font-semibold text-[#f5f5f5]">{it.name}</div>
                        <div className="text-xs text-[#777]">Qty: {it.quantity} {it.size ? `· Size ${it.size}` : ''}</div>
                      </div>
                      <div className="text-sm font-bold text-[#c9a96e]">{formatPrice(it.price * it.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#222] flex justify-between items-center">
                <span className="text-sm font-semibold text-[#aaa]">Total Amount Due:</span>
                <span className="text-xl font-bold font-display text-[#c9a96e]">
                  {formatPrice(selectedOrderDetails.totalAmount)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#222] flex justify-between">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-[#222] hover:bg-[#2e2e2e] text-xs font-semibold text-[#ccc] rounded transition-colors"
              >
                Print Slip
              </button>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-4 py-2 bg-[#c9a96e] hover:bg-[#d8bc85] text-xs font-bold text-[#0a0a0a] rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

