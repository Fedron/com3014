import Tag from '@/components/Tag';
function ProfileSkillCard({}) {
    return (
      <div className={`card h-full rounded-none font-heading text-neutral text-sm font-medium w-full h-70 drop-shadow-md bg-base-100`}>
          <div className="card-body">
            <h3 className={`text-lg font-bold card-title`}>Skills</h3>
            <Tag color="error"  buttonType="delete"  tagName="Artificial Intelligence" />
            <Tag color="error"  buttonType="delete"  tagName="Blockchain Technology"/>
            <Tag color="error"  buttonType="delete"  tagName="Communications"/>
            <Tag color="error"  buttonType="delete"  tagName="Creative"/>
            <Tag color="error"  buttonType="delete"  tagName="Java"/>
            <Tag color="error"  buttonType="delete"  tagName="Python"/>
            <Tag color="error"  buttonType="delete"  tagName="Software Engineering"/>
            <Tag color="error"  buttonType="delete"  tagName="Teamwork"/>
          </div>
      </div>
    );
  }
  export default ProfileSkillCard;
  