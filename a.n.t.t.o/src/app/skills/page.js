import Frame from '@/components/Frame';
import SkillCard from '@/components/SkillCard';
import Tag from '@/components/Tag';
export default function Skills() {
    return (
        <main>
            <Frame imageUrl="/skills.jpg" pageTitle="Skills">
            <div className="relative">
                <div className='mx-4 my-6 grid grid-cols-5 gap-4 '>
                    <div className='container'>
                        <div className="font-heading text-m font-bold mb-2">
                          Recommended skills
                        </div>
                        <Tag color="primary" tagName="Artificial Intelligence" />
                        <Tag color="primary" tagName="Blockchain Technology"/>
                        <Tag color="primary" tagName="Communications"/>
                        <Tag color="primary" tagName="Creative"/>
                        <Tag color="primary" tagName="Java"/>
                        <Tag color="primary" tagName="Python"/>
                        <Tag color="primary" tagName="Software Engineering"/>
                        <Tag color="primary" tagName="Teamwork"/>
                    </div>
                
                    <div className='col-span-4'>
                        <div className='my-2 grid grid-cols-5 gap-1 gap-y-4'>
                            <SkillCard imageUrl="/default_skill.png" cardTitle="Learn Python"/> 
                            <SkillCard imageUrl="/default_skill.png" cardTitle="Link 1"/> 
                            <SkillCard imageUrl="/default_skill.png" cardTitle="Link 2"/> 
                            <SkillCard imageUrl="/default_skill.png" cardTitle="Link 3"/> 
                            <SkillCard imageUrl="/default_skill.png" cardTitle="Link 4"/> 
                            <SkillCard imageUrl="/default_skill.png" cardTitle="Link 5"/> 
                            <SkillCard imageUrl="/default_skill.png" cardTitle="Link 6"/> 
                            <SkillCard imageUrl="/default_skill.png" cardTitle="Link 7"/> 
                        </div> 
                    </div>  
                    
                </div>
            </div>
            </Frame>
        </main>
    );
}