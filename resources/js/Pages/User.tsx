import DataTable from '@/components/data-table';
import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Columns } from 'lucide-react';
import { ColumnHeader } from '@/components/column-header';
import Avatar from '@/components/ui/avatar';
import react, { useMemo } from 'react';
import { AvatarImage } from '@radix-ui/react-avatar';

type Props = {
    users: User[];
}

const Users = ({ users }:Props) => {
    const columns = useMemo<ColumnDef<User>[]>(() => [
    {
        id: 'avatar',
        header: ({column}) => <ColumnHeader column={column} title="Avatar" />,
        enableSorting: false,
    cell: ({row}) => {
                const user = row.original;
                return (
                    <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                    </Avatar>
                    );
    },
        ], []);
    return (
        <div>
            <DataTable columns={[columns]} data={users}/>
        </div>
    );
}

export default Users;
