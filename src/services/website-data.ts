import management from '@/data/management.json';
import contact from '@/data/contact.json';
import operations from '@/data/operations.json';
import regions from '@/data/regions.json';

export function getWebsiteDataContext(): string {
  const parts: string[] = [];

  parts.push('CHED MANAGEMENT TEAM');
  parts.push('These are the current officeholders as listed on the official CHED website:');
  for (const person of management.team) {
    parts.push(`- ${person.name} — ${person.title}`);
  }

  if (management.departments && management.departments.length > 0) {
    parts.push('\nCHED DEPARTMENTS AND HEADS');
    for (const dept of management.departments) {
      parts.push(`- ${dept.title} — Head: ${dept.head} (${dept.description})`);
    }
  }

  parts.push('\nCHED HEADQUARTERS');
  parts.push(`${contact.headquarters.address}, ${contact.headquarters.city}`);
  parts.push(`Digital Address: ${contact.headquarters.digitalAddress}`);
  parts.push(`Phone: ${contact.headquarters.phone.join(', ')}`);
  parts.push(`Email: ${contact.headquarters.email}`);
  parts.push(`Hours: ${contact.headquarters.hours}`);

  parts.push('\nCHED OPERATIONS (KEY STATISTICS)');
  for (const stat of operations.keyStats) {
    parts.push(`- ${stat.label}: ${stat.value}`);
  }
  parts.push('\nPrograms:');
  for (const prog of operations.programs) {
    parts.push(`- ${prog.title}: ${prog.description}`);
  }

  parts.push('\nCHED REGIONAL OFFICES');
  for (const region of regions.regions) {
    const label = region.isHeadquarters ? ' (Headquarters)' : region.isCollege ? ' (College)' : '';
    parts.push(`- ${region.name}${label}: ${region.location}, Tel: ${region.tel.join(', ')}`);
  }

  return parts.join('\n');
}
