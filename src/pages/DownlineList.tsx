import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {useNavigate} from '@tanstack/react-router';
import Loader from '@/components/common/Loader';
import {useAdminLogin} from '@/lib/react-query/Auth/auth';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {useAuthContext} from '@/context/AuthContext';
import {useGetCustmerDownline} from '@/lib/react-query/Customer/home';
import {
  ChevronRight,
  ChevronDown,
  User,
  Users,
  Calendar,
  Search,
} from 'lucide-react';
import GenericTable from '@/components/Forms/Table/GenericTable';
import {Column} from '@/types';

interface DecodedToken extends JwtPayload {
  user: {
    role: string;
  };
}

interface DownlineNode {
  name: string;
  data: {
    username: string;
    crnNo: string;
    id: string;
    first_name: string;
    side: string;
    directSponsorId: string;
    isActive: boolean;
    rightCount: number;
    leftCount: number;
    package: number;
    orderStatus: string;
    joiningDate: string;
  };
  children: DownlineNode[];
}

type CustomerData = {
  id: string;
  fullname: string;
  crnNo: string;
  sponsorId: string;
  side: string;
  isActive: boolean;
  package: number;
  orderStatus: string;
  joiningDate: string;
  joiningDateOnly: string;
  leftCount: number;
  rightCount: number;
  level?: number;
  username?: string;
};

const columns: Column<CustomerData>[] = [
  {
    header: 'Name',
    accessor: 'fullname',
    cell: (value: string, row: CustomerData) => (
      <div className="flex items-center">
        <User className="text-gray-400 mr-2 h-4 w-4" />
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {header: 'Customer ID', accessor: 'crnNo'},
  {header: 'Sponsor ID', accessor: 'sponsorId'},
  {
    header: 'Side',
    accessor: 'side',
    cell: (value: string) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          value === 'LEFT'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    header: 'Status',
    accessor: 'isActive',
    cell: (value: boolean) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {value ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    header: 'Package',
    accessor: 'package',
    cell: (value: number) => (
      <span className="bg-gray-100 rounded-full px-2 py-1 text-xs font-medium">
        {value}
      </span>
    ),
  },
  {
    header: 'Order Status',
    accessor: 'orderStatus',
    cell: (value: string) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          value === 'PENDING'
            ? 'bg-yellow-100 text-yellow-800'
            : value === 'COMPLETED'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    header: 'Joining Date',
    accessor: 'joiningDate',
    cell: (value: string) =>
      new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
  },
  {
    header: 'Left Count',
    accessor: 'leftCount',
    cell: (value: number) => <span className="block text-center">{value}</span>,
  },
  {
    header: 'Right Count',
    accessor: 'rightCount',
    cell: (value: number) => <span className="block text-center">{value}</span>,
  },
];

const DownlineList: React.FC = () => {
  const {mutateAsync: signIn} = useAdminLogin();
  const navigate = useNavigate();
  const {data: apiResponse, isLoading, error} = useGetCustmerDownline();
  const [treeData, setTreeData] = useState<CustomerData[]>([]);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const {setUser, setIsAuthenticated, setToken} = useAuthContext();

  // Flatten the nested tree structure
  const flattenDownlineData = useCallback(
    (
      nodes: DownlineNode | DownlineNode[],
      level: number = 0,
    ): CustomerData[] => {
      if (!nodes) return [];

      const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
      let result: CustomerData[] = [];

      nodeArray.forEach((node) => {
        // Format joining date
        const joiningDate = new Date(node.data.joiningDate);
        const joiningDateOnly = new Intl.DateTimeFormat('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).format(joiningDate);

        // Add current node
        result.push({
          id: node.data.id,
          fullname: node.name || node.data.first_name,
          crnNo: node.data.crnNo,
          sponsorId: node.data.directSponsorId,
          side: node.data.side,
          isActive: node.data.isActive,
          package: node.data.package,
          orderStatus: node.data.orderStatus,
          joiningDate: node.data.joiningDate,
          joiningDateOnly: joiningDateOnly,
          leftCount: node.data.leftCount,
          rightCount: node.data.rightCount,
          level: level,
          username: node.data.username,
        });

        // Add children recursively
        if (node.children && node.children.length > 0) {
          result = [
            ...result,
            ...flattenDownlineData(node.children, level + 1),
          ];
        }
      });

      return result;
    },
    [],
  );

  // Group data by date
  const groupedData = useMemo(() => {
    const groups: {[key: string]: CustomerData[]} = {};

    // Filter by search term if any
    const filteredData = searchTerm
      ? treeData.filter(
          (item) =>
            item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.crnNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : treeData;

    filteredData.forEach((item) => {
      const date = item.joiningDateOnly;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });

    // Sort dates in descending order (newest first)
    return Object.keys(groups)
      .sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB.getTime() - dateA.getTime();
      })
      .reduce(
        (acc, date) => {
          acc[date] = groups[date];
          return acc;
        },
        {} as {[key: string]: CustomerData[]},
      );
  }, [treeData, searchTerm]);

  // Calculate summary for each date
  const dateSummaries = useMemo(() => {
    const summaries: {
      [key: string]: {
        totalMembers: number;
        activeMembers: number;
        leftSide: number;
        rightSide: number;
      };
    } = {};

    Object.entries(groupedData).forEach(([date, items]) => {
      summaries[date] = {
        totalMembers: items.length,
        activeMembers: items.filter((item) => item.isActive).length,
        leftSide: items.filter((item) => item.side === 'LEFT').length,
        rightSide: items.filter((item) => item.side === 'RIGHT').length,
      };
    });

    return summaries;
  }, [groupedData]);

  useEffect(() => {
    if (apiResponse?.data) {
      console.log('Processing API data:', apiResponse.data);
      const flattened = flattenDownlineData(apiResponse.data);
      console.log('Flattened data:', flattened);
      setTreeData(flattened);

      // Initially expand all dates
      const dates = new Set(flattened.map((item) => item.joiningDateOnly));
      setExpandedDates(dates);
    }
  }, [apiResponse, flattenDownlineData]);

  const toggleDate = (date: string) => {
    setExpandedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedDates(new Set(Object.keys(groupedData)));
  };

  const collapseAll = () => {
    setExpandedDates(new Set());
  };

  const handleLogin = async (item: CustomerData) => {
    try {
      const res = await signIn({
        email: item.crnNo,
      });

      setUser(jwtDecode(res.data.token.accessToken || ''));
      setToken(res.data?.token);
      setIsAuthenticated(true);

      const decoded = jwtDecode<DecodedToken>(res.data.token.accessToken || '');
      const role = res.data?.user?.role;

      if (role === 'ADMIN') {
        window.location.href = '/';
      } else if (role === 'CUSTOMER') {
        window.location.href = '/customer/dashboard';
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleEdit = (item: CustomerData) => {
    navigate({
      to: `/admin/UpdateCustomer/${item.id}`,
    });
  };

  if (isLoading) return <Loader />;

  if (error) {
    console.error('API Error:', error);
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600">
        Error fetching downline data: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-gray-800 text-2xl font-bold">Downline List</h1>

        <div className="flex w-full flex-col items-stretch space-y-2 sm:w-auto sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-gray-300 w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="text-gray-400 absolute left-3 top-2.5 h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Grouped Data with Collapsible Sections */}
      <div className="space-y-4">
        {Object.keys(groupedData).length > 0 ? (
          Object.entries(groupedData).map(([date, items]) => (
            <div
              key={date}
              className="overflow-hidden rounded-lg border border-stroke bg-white shadow"
            >
              {/* Date Header - Click to expand/collapse */}
              <div
                onClick={() => toggleDate(date)}
                className="bg-gray-50 hover:bg-gray-100 flex cursor-pointer items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {expandedDates.has(date) ? (
                      <ChevronDown size={20} className="text-gray-600" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-600" />
                    )}
                    <Calendar size={18} className="text-gray-500" />
                    <h2 className="text-gray-700 text-lg font-semibold">
                      {date}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedDates.has(date) && (
                <div className="border-t border-stroke">
                  <GenericTable
                    data={items}
                    columns={columns}
                    itemsPerPage={items.length}
                    searchAble={false}
                    onEdit={handleEdit}
                    onLogin={handleLogin}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-stroke bg-white py-8 text-center">
            <p className="text-gray-500">
              {searchTerm
                ? 'No matching members found'
                : 'No downline data available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownlineList;
