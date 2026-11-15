
interface servicetype{
  service:string,
    toggleService?:(recv:string)=>void;
    isSelected:boolean
}
function Service(item:servicetype) {
   return (
                      <button
                        type="button"
                        key={item.service}
                        onClick={() => item.toggleService(item.service)}//selection not selection
                  
                        className={`flex min-h-20 items-center justify-between border p-4 text-left transition ${item.isSelected
                            ? "border-[#57816A] bg-[#EAF1EA] ring-1 ring-[#57816A]"
                            : "border-[#E0E5DE] bg-white hover:border-[#91AA94] hover:bg-[#F9FAF6]"
                          }`}
                      >
                        <span className="text-sm font-semibold text-[#31483E]">
                          {item.service}
                        </span>
                        <span
                          className={`ml-3 flex h-5 w-5 shrink-0 items-center justify-center border text-xs ${item.isSelected
                              ? "border-[#185744] bg-[#185744] text-white"
                              : "border-[#C8D8CB] bg-white"
                            }`}
                        >
                          {item.isSelected ? "✓" : ""}
                        </span>
                      </button>
                    );
}

export default Service