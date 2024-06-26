'use client';
import Container from '../Container'
import { categories } from '@/utils'
import { Category } from './Category'
import { usePathname, useSearchParams } from 'next/navigation'

export const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category')

    const patname = usePathname();
    const isMainPage = patname === '/';

    if(!isMainPage) return null;
    
  return (
    <div className='bg-white'>
        <Container>
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {categories.map((item)=> (
                    <Category 
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label || (category === null && item.label === 'Todos')}
                    />
                ))}
            </div>
        </Container>
        
    </div>
  )
}
