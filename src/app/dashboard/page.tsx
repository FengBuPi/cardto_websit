import { redirect } from 'next/navigation';

export default function Dashboard() {
  // 服务器端重定向到主页
  redirect('/dashboard/home');
}
