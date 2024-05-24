export function getServiceName(name: string) {
  return name.replace("Service", "").slice(1);
}
