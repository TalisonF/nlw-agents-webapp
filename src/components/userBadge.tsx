import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/http/use-user';
import { deleteToken } from '@/lib/token';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export function UserBadge() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.invalidateQueries({ queryKey: ['get-user'] });
    deleteToken();
    navigate('/');
  };

  const { data, isFetching } = useUser();

  if (!isFetching && data.id === '') {
    handleLogout();
  }

  return (
    <div className="mb-8 flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50">
      {isFetching ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 p-2 dark:bg-blue-900">
            <User />
          </div>
          <div className="flex-1 flex-col gap-1">
            <h3 className="font-medium ">{data?.name}</h3>
            <h3 className="mb-1 text-muted-foreground text-sm">
              {data?.email}
            </h3>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Sair <ArrowLeft className="size-3" />
          </Button>
        </>
      )}
    </div>
  );
}
